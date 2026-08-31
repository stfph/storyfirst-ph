import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// List of our singleton document types
const singletonActions = new Set(["publish", "discardChanges", "restoreChanges"])
const singletonTypes = new Set(["globalSettings", "heroSettings", "aboutSettings", "teamSettings"])

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
            // Create a dedicated "Settings" folder
            S.listItem()
              .title('Website Settings')
              .child(
                S.list()
                  .title('Settings Pages')
                  .items([
                    S.listItem().title('Global & Contact').child(S.document().schemaType('globalSettings').documentId('globalSettings')),
                    S.listItem().title('Hero Section').child(S.document().schemaType('heroSettings').documentId('heroSettings')),
                    S.listItem().title('About Section').child(S.document().schemaType('aboutSettings').documentId('aboutSettings')),
                    S.listItem().title('Team Section').child(S.document().schemaType('teamSettings').documentId('teamSettings')),
                  ])
              ),
            S.divider(),
            // Automatically list all other content (Projects, Awards, etc.) but hide the settings documents from this main list
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out creation templates for singletons (stops users from hitting "Create New")
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions like "Delete" or "Duplicate"
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => input && singletonActions.has(action))
        : input,
  },
})