import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import pool from '@/lib/db';

async function getCourses() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, title FROM courses');
    client.release();
    return result.rows.map((course) => ({
      id: course.id,
      title: course.title,
      slug: course.title.toLowerCase().replace(/\s+/g, '-'), // Simple slug generation
    }));
  } catch (error) {
    console.error('Failed to fetch courses from database:', error);
    throw error;
  }
}

export default async function Home() {
  let courses = []
  try {
    courses = await getCourses()
  } catch (error) {
    console.error('Failed to fetch courses:', error)
    // You might want to add some error UI here
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            LearnPlatform
          </Link>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to LearnPlatform</h1>
          <p className="text-xl mb-8">Discover our amazing courses and start learning today!</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
              <Button asChild>
                <Link href={`/course/${course.slug}`}>View Course</Link>
              </Button>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}