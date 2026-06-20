import React from 'react';
import Card from '../../../../../components/ui/layouts/Card';
import { Heading, Paragraph } from '../../../../../components/ui';
import { Play, Volume2, Settings, ExternalLink, Maximize2 } from 'lucide-react';

const CourseMain = ({ course }) => {
  return (
    <div>
      <Card>
        <div className="relative overflow-hidden rounded-lg bg-black">
          <img
            src={course.video}
            alt={course.title}
            className="h-64 w-full object-cover"
          />

          {/* centered play button overlay */}
          <button
            aria-label="Play video"
            className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 shadow-xl backdrop-blur-sm transition hover:scale-105"
          >
            <Play className="text-[#73BFA1]" size={28} />
          </button>

          {/* progress bar */}
          <div className="absolute right-6 bottom-16 left-6">
            <div className="h-1 rounded-full bg-white/30">
              <div
                className="h-1 rounded-full bg-[#73BFA1]"
                style={{ width: '28%' }}
              />
            </div>
          </div>

          {/* controls row */}
          <div className="absolute right-6 bottom-4 left-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">00:01</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-white/90">
                <Volume2 size={18} />
              </button>

              <div className="relative h-1 w-20 rounded-full bg-white/30">
                <div className="absolute top-[-4px] left-1/4">
                  <div className="h-2 w-2 rounded-full bg-white shadow" />
                </div>
              </div>

              <button className="text-white/90">
                <Settings size={18} />
              </button>

              <button className="text-white/90">
                <ExternalLink size={18} />
              </button>

              <button className="text-white/90">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <Heading level={4} className="mb-2">
          <span className="font-semibold">Video:</span>{' '}
          <span className="font-normal">What is Seveso Training</span>
        </Heading>
        <Paragraph className="text-sm leading-relaxed text-gray-600">
          {course.description}
        </Paragraph>
      </div>
    </div>
  );
};

export default CourseMain;
