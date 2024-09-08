import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('courseContent');
  const slug = req.query.slug;
  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    const client = await pool.connect();
    const courseResult = await client.query('SELECT * from courses');
    console.log('courseResult', courseResult.rows);
    const sectionsResult = await client.query('SELECT sections.id, sections.title, sections.order_index FROM sections JOIN courses ON sections.course_id = courses.id WHERE courses.slug = $1 ORDER BY sections.order_index', [slug]);
    const lessonsResult = await client.query('SELECT lessons.id, lessons.title, lessons.content_url, sections.id AS section_id FROM lessons JOIN sections ON lessons.section_id = sections.id JOIN courses ON lessons.course_id = courses.id WHERE courses.slug = $1 ORDER BY lessons.order_index', [slug]);
    client.release();

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = courseResult.rows[0];
    const sections = sectionsResult.rows;
    const lessons = lessonsResult.rows.reduce((acc, lesson) => {
      const sectionId = lesson.section_id;
      if (!acc[sectionId]) {
        acc[sectionId] = [];
      }
      acc[sectionId].push({
        id: lesson.id,
        title: lesson.title,
        imageUrl: lesson.content_url && lesson.content_url.includes('public') ? lesson.content_url : null,
        videoId: lesson.content_url && lesson.content_url.includes('manifest') ? lesson.content_url.split('/manifest')[0].split('/').pop() : null,
      });
      return acc;
    }, {});

    res.status(200).json({
      id: course.id,
      title: course.title,
      description: course.description,
      sections: sections.map(section => ({
        id: section.id,
        title: section.title,
        lessons: lessons[section.id] || [],
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}
