import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'wFramework',
  tagline: 'A new thinking framework for the FiveM ecosystem.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://wFramework.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wFramework', // Usually your GitHub org/user name.
  projectName: 'wFramework.github.io', // Usually your repo name.
  deploymentBranch: 'deployment', // Deployment branch.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    defaultMode: 'dark',
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'wFramework',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          label: "GitHub Organization",
          href: "https://github.com/wFramework/"
        },
        {
          label: 'Official Discord',
          href: 'https://discord.com/invite/',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Documentation built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'lua'
      ]
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
