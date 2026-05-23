interface CategoryTagProps {
  category: string;
}

export default function CategoryTag({ category }: CategoryTagProps) {
  return (
    <span data-testid="category-tag" className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium border blog-category-tag">
      {category}
    </span>
  );
}
