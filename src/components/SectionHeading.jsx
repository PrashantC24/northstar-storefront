import { Link } from 'react-router-dom';

export default function SectionHeading({ title, linkTo, linkText = 'View all' }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {linkTo ? (
        <Link to={linkTo} className="text-link">
          {linkText}
        </Link>
      ) : null}
    </div>
  );
}
