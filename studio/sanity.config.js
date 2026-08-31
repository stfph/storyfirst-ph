import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

import { CogIcon } from '@sanity/icons/Cog'
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe'
import { HomeIcon } from '@sanity/icons/Home'
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { PresentationIcon } from '@sanity/icons/Presentation'
import { StarIcon } from '@sanity/icons/Star'
import { UsersIcon } from '@sanity/icons/Users'
import { HeartIcon } from '@sanity/icons/Heart'
import { CommentIcon } from '@sanity/icons/Comment'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

const singletonActions = new Set(["publish", "discardChanges", "restoreChanges"])
const singletonTypes = new Set([
  "globalSettings", "heroSettings", "aboutSettings", "servicesSettings",
  "projectsSettings", "awardsSettings", "clientsSettings", "advocaciesSettings",
  "testimonialsSettings", "teamSettings", "contactSettings"
])

export default defineConfig({
  name: 'default',
  title: 'StoryFirst PH CMS',

  projectId: '3tcl3ri4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            S.listItem()
              .title('Website Settings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Settings Pages')
                  .items([
                    S.listItem().title('Global & Footer').icon(EarthGlobeIcon).child(S.document().schemaType('globalSettings').documentId('globalSettings')),
                    S.listItem().title('Hero Section').icon(HomeIcon).child(S.document().schemaType('heroSettings').documentId('heroSettings')),
                    S.listItem().title('About Section').icon(InfoOutlineIcon).child(S.document().schemaType('aboutSettings').documentId('aboutSettings')),
                    S.listItem().title('Services Section').icon(SparklesIcon).child(S.document().schemaType('servicesSettings').documentId('servicesSettings')),
                    S.listItem().title('Projects Section').icon(PresentationIcon).child(S.document().schemaType('projectsSettings').documentId('projectsSettings')),
                    S.listItem().title('Awards Section').icon(StarIcon).child(S.document().schemaType('awardsSettings').documentId('awardsSettings')),
                    S.listItem().title('Clients Section').icon(UsersIcon).child(S.document().schemaType('clientsSettings').documentId('clientsSettings')),
                    S.listItem().title('Advocacies Section').icon(HeartIcon).child(S.document().schemaType('advocaciesSettings').documentId('advocaciesSettings')),
                    S.listItem().title('Testimonials Section').icon(CommentIcon).child(S.document().schemaType('testimonialsSettings').documentId('testimonialsSettings')),
                    S.listItem().title('Team Section').icon(UsersIcon).child(S.document().schemaType('teamSettings').documentId('teamSettings')),
                    S.listItem().title('Contact Section').icon(EnvelopeIcon).child(S.document().schemaType('contactSettings').documentId('contactSettings')),
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => input && singletonActions.has(action))
        : input,
  },
})