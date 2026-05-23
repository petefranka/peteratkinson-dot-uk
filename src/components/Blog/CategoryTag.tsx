interface CategoryTagProps {
  category: string;
}

export default function CategoryTag({ category }: CategoryTagProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium border blog-category-tag">
      {category}
    </span>
  );
}
