import Image from "next/image";
import Link from "next/link";

const OtherHeader = () => {
  return (
    <div className="relative w-full h-56 bg-black">
      {/* Optimized Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero2.png"
          height={200}
          width={200}
          alt="Shopping Header Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-3xl md:text-5xl font-bold">Blog List</h1>
        <p className="mt-6 text-sm md:text-base text-gray-300">
          <span className="text-gray-400">Home</span> &gt;{" "}
          <span className="text-yellow-400 gap-3">Blog</span>
        </p>
      </div>
    </div>
  );
};

const BlogPost = ({
  date,
  count,
  author,
  title,
  excerpt,
}: {
  date: string;
  count: number;
  author: string;
  title: string;
  excerpt: string;
}) => {
  return (
    <article className="space-y-4">
      <div className="relative">
        <Image
          src="/blog1.png"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
          alt={title}
        />
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
          <div className="text-center">
            <div className="text-xl font-bold">{new Date(date).getDate()}</div>
            <div className="text-xs">
              {new Date(date).toLocaleString("default", { month: "short" })}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{date}</span>
          <span>•</span>
          <span>{count} Comments</span>
          <span>•</span>
          <span>{author}</span>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{excerpt}</p>
        <Link
          href="#"
          className="inline-block text-orange-500 hover:text-orange-600"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

const BlogLayout = () => {
  const blogPosts = [
    {
      date: "Feb 14, 2023",
      count: 3,
      author: "Admin",
      title: "10 Reasons To Do A Digital Detox Challenge",
      excerpt:
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
      date: "Feb 14, 2022",
      count: 3,
      author: "Admin",
      title: "Traditional Soft Pretzels with Sweet Beer Cheese",
      excerpt:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      date: "Mar 10, 2023",
      count: 5,
      author: "Admin",
      title: "The Ultimate Guide to Mindful Living",
      excerpt:
        "Discover the secrets to leading a balanced life with our comprehensive guide to mindfulness and mental well-being.",
    },
    {
      date: "Jan 5, 2023",
      count: 7,
      author: "Admin",
      title: "Healthy Recipes for a Busy Lifestyle",
      excerpt:
        "Quick, delicious, and healthy recipes to keep you energized during a hectic workday.",
    },
  ];

  return (
    <div>
      <OtherHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Profile */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div>
                  <h2 className="font-semibold text-xl">Prince Miyako</h2>
                  <p className="text-sm text-gray-500">Blogger/Photographer</p>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Veritatis distinctio, odio eligendi suscipit reprehenderit
                  atque.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Facebook</span>
                    f
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Twitter</span>
                    t
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Instagram</span>
                    i
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
