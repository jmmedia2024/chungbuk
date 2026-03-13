
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

/**
 * [COMPLETE INTEGRATED DATABASE SCHEMA]
 * 
 * -- 1. 메인 슬라이드: main_slides (id, title, subtitle, image_url, sort_order, is_active)
 * -- 2. 공지사항: notices (id, title, content, is_important, views, created_at)
 * -- 3. 갤러리: gallery (id, title, img_url, category, date)
 * -- 4. 회원등급: profiles (id, email, full_name, level)
 * -- 5. 협회 연혁: history (id, year, content, sort_order)
 * -- 6. 조직/인력: organization (id, name, role, department, image_url, sort_order)
 * -- 7. 협력 파트너: partners (id, name, logo_url, link_url, sort_order)
 * -- 8. 사이트 설정: site_settings (key PRIMARY KEY, value) -- 예: 'logo_url', 'association_name' 등
 */

const supabaseUrl = 'https://kyndtnvdlatswnvztcko.supabase.co';
const supabaseKey = 'sb_publishable_0zh_shbQ0Hhid5USIsvFsA_TE1yjqc-';

export const supabase = createClient(supabaseUrl, supabaseKey);
