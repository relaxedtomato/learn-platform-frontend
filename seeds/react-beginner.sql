-- -- Insert beginner courses
INSERT INTO courses (title, description, slug, created_at, updated_at) VALUES
('React Native Beginner Course', 'Take the Beginner course to setup your local environment and build your first app.', 'react-native-beginner-course', NOW(), NOW());

-- Insert sections
INSERT INTO sections (title, course_id, order_index, created_at, updated_at) VALUES
('Welcome', 1, 1, NOW(), NOW()),
('Online Resources for React & Javascript', 1, 2, NOW(), NOW()),
('Introduction', 1, 3, NOW(), NOW());

-- -- Insert lessons for each section
INSERT INTO lessons (course_id, section_id, title, content_url, order_index, created_at, updated_at) VALUES
(1, 1, 'Course Outline', 'https://customer-plfj3xj9c1ffdj4n.cloudflarestream.com/c05a48e8667c0b0998a95a7e88429aee/manifest/video.m3u8', 1, NOW(), NOW()),
(1, 1, 'Join Our Online Classroom!', 'https://imagedelivery.net/i8b7UMLXslEcQBawS6Peug/72ecc981-1233-4df2-0f7c-e09049fd0100/public', 2, NOW(), NOW()),
(1, 1, 'Exercise: Meet The Community', NULL, 3, NOW(), NOW()),
(1, 2, 'Free Online Resources [Optional]', 'https://imagedelivery.net/i8b7UMLXslEcQBawS6Peug/113adc13-f368-4612-d80c-7f47991d9400/public', 1, NOW(), NOW()),
(1, 2, 'React Concepts', NULL, 2, NOW(), NOW()),
(1, 3, 'focusTime Demo', 'https://customer-plfj3xj9c1ffdj4n.cloudflarestream.com/32e48d8e0ea82e175e766a4811401e28/manifest/video.m3u8', 1, NOW(), NOW()),
(1, 3, 'Introduction To Expo', 'https://customer-plfj3xj9c1ffdj4n.cloudflarestream.com/f70abc442953acd059a3c4ec2cfcc99b/manifest/video.m3u8', 2, NOW(), NOW());