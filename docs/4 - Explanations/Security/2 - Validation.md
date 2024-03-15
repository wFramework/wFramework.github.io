## Introduction
A thing that's very commonly done in FiveM is trusting the client when making scripts, and just saying don't isn't very informative - so let me explain what I mean.

## Theoretical Example
Let's say you're making a trucker job, once the client has completed a route and delivered a trailer (or whatever it might be), you typically want to pay the driver. Now there's a problem here, if you just make an event that you trigger to add money, you've introduced an exploit. Always ask yourself, what would happen of a client were able to call this whenever they want?

That's where validation comes in! You want to put yourself in a situation where you can verify (to whatever extent possible) that the client actually completed said route from the server, before paying out the money.

You might be wondering how you'd best approach that, and I'll get to that now. You're going to make sure the server has all the information needed to make sure that the client either did the job, or faked it enough to a point where it took the same time and they're not just calling it from somewhere they're not supposed to.

Here's how I would structure said job:
- Client tells server that it wants to start a job
- Server gives client a route and stores what route the client started
- Client tells server it is ready to start
- Server validates that client is where it needs to be to start the job (this might be at the pickup point, or wherever) and stores when the client started the job
- Client drives to their destination and tells server that they've completed assigned route
- Server validates based on start pos and end pos how long it took for the client to complete this, and validates that the client is at the end pos when calling it. You're going to have to cut the check a bit of slack, so that the clients speeding won't trigger any false flags, but generally someone doesn't travel from one end of the map to the other in seconds.
- You then calculate the pay entirely on the server, based on all the parameters you have, and give the client their money.

This way you'll make sure that they're either completing their tasks legit, or are wasting their time waiting on your checks. Another great thing is that a lot of malicious clients will try to call the events right after another to get quick cash, and you'll then have the opportunity to flag them!

## Example Code
All this is pseduo code, provided for those who prefer more practical examples.


**Config**
```lua
local Config = {}

Config.MinTimePerTraveledUnit = 0.5 -- How long it'd take at minimum to travel one unit

Config.Routes = {
    {
        start = vector3(0, 0, 0),
        finish = vector3(0, 0, 0),
        basePay = 100,
        timeBonus = 10
    }
}

return Config
```

**Client**
```lua
RegisterCommand("StartJob", function() -- replace this with whatever you're using to start the job
    TriggerServerEvent("Trucker:Server:RequestJob")
end)

RegisterNetEvent("Trucker:Client:GotJob", function(route)
    -- You now know relevant information about the route, and can start the job.
    -- here you'd typically set a blip, or whatever you'd like for the script you're making.
end)

RegisterCommand("BeginRoute", function() -- In this scenario, you'd probably check for when the client is in the "start" pos and then we're telling the server we're ready to start driving.
    TriggerServerEvent("Trucker:Server:Begin")
end)

RegisterCommand("FinishJob", function() -- In this scenario, you'd probably check for when the client is in the "finish" pos and then call this.
    TriggerServerEvent("Trucker:Server:Finish")
end)
```

**Server**
```lua
local Config = require 'config' -- you may get your config however you wish, doesn't matter for this example

local OngoingJobs = {}

RegisterNetEvent("Trucker:Server:RequestJob", function()
    if OngoingJobs[source] then
        return -- client tried requestning a new job while they're already doing one
    end

    local route = Config.Routes[math.random(1, #Config.Routes)]
    OngoingJobs[source] = { -- as explained, you store data related to the job here
        route = route
    }

    TriggerClientEvent("Trucker:Client:GotJob", source, route)
end)

RegisterNetEvent("Trucker:Server:Begin", function()
    if not OngoingJobs[source] then
        return -- client tried to begin a job they're not doing
    end

    local ped = GetPlayerPed(source)
    local pos = GetEntityCoords(ped)
    local distance = #(pos - OngoingJobs[source].route.start) 
    
    if distance > 10 then
        return -- The client tried begnning the job from the wrong place. You should probably investigate this.
    end

    OngoingJobs[source].startedAt = os.time() -- note down when the client started the job
end)

RegisterNetEvent("Trucker:Server:Finish", function()
    if not OngoingJobs[source] then
        return -- client tried to finish a job they're not doing
    end

    local job = OngoingJobs[source]

    local ped = GetPlayerPed(source)
    local pos = GetEntityCoords(ped)
    local distance = #(pos - job.route.finish)

    if distance > 10 then
        return -- The client tried finishing the job from the wrong place. You should probably investigate this.
    end

    local traveledDistance = #(job.route.finish - job.route.start)
    local traveledTime = os.time() - job.startedAt

    if traveledTime / traveledDistance < Config.MinTimePerTraveledUnit then
        return -- client traveled too fast, you should probably investigate this.
    end

    -- calculate pay and give client money
    local pay = job.route.basePay + (traveledTime * Config.Routes.timeBonus)
    FrameworkGiveMoney(source, pay) -- replace this with however you're giving money, depending on what framework you use.
end)
```