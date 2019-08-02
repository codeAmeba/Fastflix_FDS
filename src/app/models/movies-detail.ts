interface actor {
  id: number;
  name: string;
}
interface genre {
  id: number;
  name: string;
}
interface feature {
  id: number;
  name: string;
}
export interface similarMovies {
  id: number;
  name: string;
  horizontal_image_path: string;
  marked: boolean;
  match_rate: number;
  vertical_image: string;
  degree: object[];
  synopsis: string;
  production_date: string;
}

interface director {
  id: number;
  name: string;
}

export interface MovieDetail {
  actors: actor[];
  author: director[];
  big_image_path: string;
  can_i_store: boolean;
  circle_image: string;
  degree: object;
  directors: director[];
  feature: feature[];
  genre: genre[];
  horizontal_image_path: string;
  id: number;
  like: number;
  logo_image_path: string;
  marked: boolean;
  match_rate: number;
  name: string;
  production_date: string;
  real_running_time: number;
  remaining_time: number;
  running_time: number;
  sample_video_file: string;
  similar_movies: similarMovies[];
  synopsis: string;
  to_be_continue: number;
  total_minute: number;
  uploaded_date: string;
  view_count?: string;
  vertical_image: string;
  vertical_sample_video_file: string;
  video_file: string;
}
