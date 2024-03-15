"use strict";(self.webpackChunkwxdocs=self.webpackChunkwxdocs||[]).push([[817],{5631:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var o=n(5893),i=n(1151);const r={},a=void 0,s={id:"Explanations/Security/Validation",title:"Validation",description:"Introduction",source:"@site/docs/4 - Explanations/Security/2 - Validation.md",sourceDirName:"4 - Explanations/Security",slug:"/Explanations/Security/Validation",permalink:"/docs/Explanations/Security/Validation",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Common Mistakes",permalink:"/docs/Explanations/Security/Common Mistakes"}},l={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Theoretical Example",id:"theoretical-example",level:2},{value:"Example Code",id:"example-code",level:2}];function h(e){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,o.jsx)(t.p,{children:"A thing that's very commonly done in FiveM is trusting the client when making scripts, and just saying don't isn't very informative - so let me explain what I mean."}),"\n",(0,o.jsx)(t.h2,{id:"theoretical-example",children:"Theoretical Example"}),"\n",(0,o.jsx)(t.p,{children:"Let's say you're making a trucker job, once the client has completed a route and delivered a trailer (or whatever it might be), you typically want to pay the driver. Now there's a problem here, if you just make an event that you trigger to add money, you've introduced an exploit. Always ask yourself, what would happen of a client were able to call this whenever they want?"}),"\n",(0,o.jsx)(t.p,{children:"That's where validation comes in! You want to put yourself in a situation where you can verify (to whatever extent possible) that the client actually completed said route from the server, before paying out the money."}),"\n",(0,o.jsx)(t.p,{children:"You might be wondering how you'd best approach that, and I'll get to that now. You're going to make sure the server has all the information needed to make sure that the client either did the job, or faked it enough to a point where it took the same time and they're not just calling it from somewhere they're not supposed to."}),"\n",(0,o.jsx)(t.p,{children:"Here's how I would structure said job:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Client tells server that it wants to start a job"}),"\n",(0,o.jsx)(t.li,{children:"Server gives client a route and stores what route the client started"}),"\n",(0,o.jsx)(t.li,{children:"Client tells server it is ready to start"}),"\n",(0,o.jsx)(t.li,{children:"Server validates that client is where it needs to be to start the job (this might be at the pickup point, or wherever) and stores when the client started the job"}),"\n",(0,o.jsx)(t.li,{children:"Client drives to their destination and tells server that they've completed assigned route"}),"\n",(0,o.jsx)(t.li,{children:"Server validates based on start pos and end pos how long it took for the client to complete this, and validates that the client is at the end pos when calling it. You're going to have to cut the check a bit of slack, so that the clients speeding won't trigger any false flags, but generally someone doesn't travel from one end of the map to the other in seconds."}),"\n",(0,o.jsx)(t.li,{children:"You then calculate the pay entirely on the server, based on all the parameters you have, and give the client their money."}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"This way you'll make sure that they're either completing their tasks legit, or are wasting their time waiting on your checks. Another great thing is that a lot of malicious clients will try to call the events right after another to get quick cash, and you'll then have the opportunity to flag them!"}),"\n",(0,o.jsx)(t.h2,{id:"example-code",children:"Example Code"}),"\n",(0,o.jsx)(t.p,{children:"All this is pseduo code, provided for those who prefer more practical examples."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Config"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-lua",children:"local Config = {}\n\nConfig.MinTimePerTraveledUnit = 0.5 -- How long it'd take at minimum to travel one unit\n\nConfig.Routes = {\n    {\n        start = vector3(0, 0, 0),\n        finish = vector3(0, 0, 0),\n        basePay = 100,\n        timeBonus = 10\n    }\n}\n\nreturn Config\n"})}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Client"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-lua",children:'RegisterCommand("StartJob", function() -- replace this with whatever you\'re using to start the job\n    TriggerServerEvent("Trucker:Server:RequestJob")\nend)\n\nRegisterNetEvent("Trucker:Client:GotJob", function(route)\n    -- You now know relevant information about the route, and can start the job.\n    -- here you\'d typically set a blip, or whatever you\'d like for the script you\'re making.\nend)\n\nRegisterCommand("BeginRoute", function() -- In this scenario, you\'d probably check for when the client is in the "start" pos and then we\'re telling the server we\'re ready to start driving.\n    TriggerServerEvent("Trucker:Server:Begin")\nend)\n\nRegisterCommand("FinishJob", function() -- In this scenario, you\'d probably check for when the client is in the "finish" pos and then call this.\n    TriggerServerEvent("Trucker:Server:Finish")\nend)\n'})}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Server"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-lua",children:'local Config = require \'config\' -- you may get your config however you wish, doesn\'t matter for this example\n\nlocal OngoingJobs = {}\n\nRegisterNetEvent("Trucker:Server:RequestJob", function()\n    if OngoingJobs[source] then\n        return -- client tried requestning a new job while they\'re already doing one\n    end\n\n    local route = Config.Routes[math.random(1, #Config.Routes)]\n    OngoingJobs[source] = { -- as explained, you store data related to the job here\n        route = route\n    }\n\n    TriggerClientEvent("Trucker:Client:GotJob", source, route)\nend)\n\nRegisterNetEvent("Trucker:Server:Begin", function()\n    if not OngoingJobs[source] then\n        return -- client tried to begin a job they\'re not doing\n    end\n\n    local ped = GetPlayerPed(source)\n    local pos = GetEntityCoords(ped)\n    local distance = #(pos - OngoingJobs[source].route.start) \n    \n    if distance > 10 then\n        return -- The client tried begnning the job from the wrong place. You should probably investigate this.\n    end\n\n    OngoingJobs[source].startedAt = os.time() -- note down when the client started the job\nend)\n\nRegisterNetEvent("Trucker:Server:Finish", function()\n    if not OngoingJobs[source] then\n        return -- client tried to finish a job they\'re not doing\n    end\n\n    local job = OngoingJobs[source]\n\n    local ped = GetPlayerPed(source)\n    local pos = GetEntityCoords(ped)\n    local distance = #(pos - job.route.finish)\n\n    if distance > 10 then\n        return -- The client tried finishing the job from the wrong place. You should probably investigate this.\n    end\n\n    local traveledDistance = #(job.route.finish - job.route.start)\n    local traveledTime = os.time() - job.startedAt\n\n    if traveledTime / traveledDistance < Config.MinTimePerTraveledUnit then\n        return -- client traveled too fast, you should probably investigate this.\n    end\n\n    -- calculate pay and give client money\n    local pay = job.route.basePay + (traveledTime * Config.Routes.timeBonus)\n    FrameworkGiveMoney(source, pay) -- replace this with however you\'re giving money, depending on what framework you use.\nend)\n'})})]})}function d(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>a});var o=n(7294);const i={},r=o.createContext(i);function a(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);