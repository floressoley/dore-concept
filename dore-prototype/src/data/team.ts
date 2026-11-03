import managingPartner from '../assets/team/managing-partner.webp'
import headOfSales from '../assets/team/head-of-sales.webp'
import buyersAgent from '../assets/team/buyers-agent.webp'
import privateClientsAdvisor from '../assets/team/private-clients-advisor.webp'

export type Person = { name: string; role: string; image: string }

export const TEAM: Person[] = [
  { name: 'Pau Vellis', role: 'Managing partner', image: managingPartner },
  { name: 'Marta Sorrel', role: 'Head of sales', image: headOfSales },
  { name: 'Joan Arrenti', role: 'Buyer’s agent', image: buyersAgent },
  { name: 'Elia Marin', role: 'Private clients advisor', image: privateClientsAdvisor },
]
