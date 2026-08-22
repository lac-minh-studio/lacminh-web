import type { ICommercialProject, IGameProject } from '../model/portfolio'
import {
  COMMERCIAL_PROJECTS as STATIC_COMMERCIAL_PROJECTS,
  GAME_PROJECTS as STATIC_GAME_PROJECTS,
} from '../infrastructure/static/portfolio'

export interface IGameProjectRowView {
  game: IGameProject
  reversed: boolean
}

const GAME_PROJECT_ROW_REVERSED_BY_ID: Record<string, boolean> = {
  'sen-city': true,
}

export const GAME_PROJECTS: IGameProject[] = STATIC_GAME_PROJECTS
export const COMMERCIAL_PROJECTS: ICommercialProject[] = STATIC_COMMERCIAL_PROJECTS

export const GAME_PROJECT_ROWS: IGameProjectRowView[] = STATIC_GAME_PROJECTS.map((game) => ({
  game,
  reversed: GAME_PROJECT_ROW_REVERSED_BY_ID[game.id] ?? false,
}))
