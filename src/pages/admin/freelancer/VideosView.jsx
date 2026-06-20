import {
  Button,
  Card,
  Column,
  Container,
  Grid,
  Heading,
  Image,
  Paragraph,
  Row,
  Tabs,
} from '../../../components/ui';
const courses = [
  {
    id: 1,
    title: 'React Mastery',
    desc: 'Learn hooks, context, and performance optimization.',
    image:
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    students: 120,
  },
  {
    id: 2,
    title: 'Node.js Fundamentals',
    desc: 'Learn hooks, context, and performance optimization.',
    image:
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    students: 90,
  },
  {
    id: 3,
    title: 'Next.js Advanced',
    desc: 'Server-side rendering and dynamic routing like a pro.',
    image:
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    students: 140,
  },
  {
    id: 4,
    title: 'MongoDB Deep Dive',
    desc: 'Schemas, relationships, and aggregation pipelines.',
    image:
      'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    students: 110,
  },
];

const myTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <p>📄 Overview content here.</p>,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content: <p>📊 Analytics and insights go here.</p>,
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <p>⚙️ Configure your preferences.</p>,
  },
];

const VideosView = () => {
  return (
    <>
      <Container size="full" className="py-10">
        <Row justify="between" className="mb-8">
          <Heading
            level={1}
            className="text-2xl font-bold text-gray-800 sm:text-3xl"
          >
            [TEACHER] VideosView
          </Heading>
          <Button
            label="Add Course"
            variant="primary"
            size="md"
            className="rounded-md"
          />
        </Row>

        <Grid cols={4} gap="lg">
          {courses.map((course) => (
            <Column key={course.id}>
              <Card
                padding=""
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
              >
                {/* Image */}

                <Image
                  src={course.image}
                  alt={course.title}
                  rounded=""
                  className="h-48 md:h-44"
                />

                {/* Card Content */}
                <div className="flex flex-grow flex-col p-4">
                  <Heading
                    level={3}
                    className="mb-1 truncate text-lg font-semibold text-gray-800"
                  >
                    {course.title}
                  </Heading>
                  <Paragraph
                    variant="small"
                    className="mb-3 line-clamp-2 text-gray-600"
                  >
                    {course.desc}
                  </Paragraph>

                  {/* Footer Section */}
                  <Row
                    justify="between"
                    align="center"
                    className="mt-auto border-t border-gray-100 pt-3"
                  >
                    <Paragraph className="text-sm text-gray-500">
                      👩‍🎓 {course.students} students
                    </Paragraph>
                    <Button
                      size="sm"
                      variant="secondary"
                      label="View"
                      className="rounded-md"
                    />
                  </Row>
                </div>
              </Card>
            </Column>
          ))}
        </Grid>
      </Container>
      <Container size="full" className="py-10">
        <Row justify="between" className="mb-8">
          <Heading
            level={1}
            className="text-2xl font-bold text-gray-800 sm:text-3xl"
          >
            [TEACHER] VideosView
          </Heading>
          <Button
            label="Add Course"
            variant="primary"
            size="md"
            className="rounded-md"
          />
        </Row>

        <Tabs tabs={myTabs} orientation="horizontal" />
      </Container>
    </>
  );
};

export default VideosView;
