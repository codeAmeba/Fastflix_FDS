export interface MovieDetail {
  id: number;
  name: string;
  video_file: string;
  sample_video_file: string;
  production_date: string;
  uploaded_date: string;
  synopsis: string;
  running_time: number;
  view_count: string;
  logo_image_path: string;
  horizontal_image_path: string;
  vertical_image: string;
  circle_image: string;
  degree: object;
  directors: string[];
  actors: string[];
  feature: string[];
  author: string[];
  genre: string[];
  marked: string;
  like: number;
  total_minute: number;
  match_rate: number;
  to_be_continue: number;
  remaining_time: number;
  can_i_store?: boolean;
}
