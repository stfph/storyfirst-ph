import globalSettings from './globalSettings'
import heroSettings from './heroSettings'
import aboutSettings from './aboutSettings'
import servicesSettings from './servicesSettings'
import projectsSettings from './projectsSettings'
import awardsSettings from './awardsSettings'
import clientsSettings from './clientsSettings'
import advocaciesSettings from './advocaciesSettings'
import testimonialsSettings from './testimonialsSettings'
import teamSettings from './teamSettings'
import contactSettings from './contactSettings'

import service from './service'
import project from './project'
import award from './award'
import client from './client'
import collaborator from './collaborator'
import advocacy from './advocacy'
import testimonial from './testimonial'
import teamMember from './teamMember'

export const schemaTypes = [
  // Singletons
  globalSettings,
  heroSettings,
  aboutSettings,
  servicesSettings,
  projectsSettings,
  awardsSettings,
  clientsSettings,
  advocaciesSettings,
  testimonialsSettings,
  teamSettings,
  contactSettings,

  // Array Documents
  service,
  project,
  award,
  client,
  collaborator,
  advocacy,
  testimonial,
  teamMember,
]
