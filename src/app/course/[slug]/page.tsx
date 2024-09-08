'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Stream } from "@cloudflare/stream-react";

import { useEffect, useState } from 'react';

// Define types for Course, Section, and Lesson
// test
type Lesson = {
  id: number;
  title: string;
  imageUrl: string | null;
  videoId: string | null;
};

type Section = {
  id: number;
  title: string;
  lessons: Lesson[];
};

type Course = {
  id: number;
  title: string;
  description: string;
  sections: Section[];
};

export default function CoursePage({ params }: { params: { slug: string } }) {
const [course, setCourse] = useState<Course>({ id: 0, title: '', description: '', sections: [] });
const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
const isEnrolled = true

useEffect(() => {
  console.log('params', params)
  const fetchCourse = async () => {
    const response = await fetch(`/api/courseContent?slug=${params.slug}`);
    const data = await response.json();
    console.log('Updated params with data', params, data)
    setCourse(data);
  };

  fetchCourse();
}, [params.slug]);

const handleNext = () => {
  if (currentSectionIndex < course.sections?.length - 1) {
    setCurrentSectionIndex(currentSectionIndex + 1);
  }
};

const handlePrevious = () => {
  if (currentSectionIndex > 0) {
    setCurrentSectionIndex(currentSectionIndex - 1);
  }
};

return (
  <div className="min-h-screen bg-background">
    <header className="container mx-auto py-6">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          LearnPlatform
        </Link>
      </nav>
    </header>

    <main className="container mx-auto py-12">
      {/* <h1 className="text-4xl font-bold mb-4">{course.title}</h1> */}
      {/* <p className="text-xl mb-8">{course.description}</p> */}

      <div className="mb-8">
        {/* <h2 className="text-2xl font-semibold mb-4">Course Preview</h2> */}
        {/* <p>{course.previewContent}</p> */}
      </div>

      {isEnrolled ? (
        <div>
          {/* <h2 className="text-2xl font-semibold mb-4">Full Course Content</h2> */}
          {course.sections?.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold mb-2">{course.sections[currentSectionIndex].title}</h3>
              <hr className="mb-4"/>
              {course.sections[currentSectionIndex].lessons.map((lesson) => (
                <div key={lesson.id} className="mb-4">
                  <h4 className="text-2xl font-semibold">Lesson: {lesson.title}</h4>
                  {(lesson.videoId || lesson.imageUrl) ? (
                    <div style={{ position: 'relative', paddingTop: '5%' }}>
                      {lesson.videoId ? (
                        <Stream controls src={lesson.videoId} />
                      ) : (
                        <img src={lesson.imageUrl || ''} alt={lesson.title} />
                      )}
                    </div>
                  ) : (
                    <p>Coming soon!</p>
                  )}
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <Button onClick={handlePrevious} disabled={currentSectionIndex === 0}>
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentSectionIndex === course.sections.length - 1}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-4">To access the full course content, you need to enroll.</p>
          <Button asChild>
            {/* <Link href={`/enroll/${course.slug}`}>Enroll Now</Link> */}
          </Button>
        </div>
      )}
    </main>
  </div>
)
}