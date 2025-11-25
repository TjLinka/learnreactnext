export default function Title({ children, size = "md", center=false }) {
  let titleSize = null;
  switch (size) {
    case "md":
      titleSize = "text-md";
      break;
    case "lg":
      titleSize = "text-lg";
      break;
    case "xl":
      titleSize = "text-xl";
      break;
    case "2xl":
      titleSize = "text-2xl";
      break;
    case "3xl":
      titleSize = "text-3xl";
      break;
    case "4xl":
      titleSize = "text-4xl";
      break;
    case "5xl":
      titleSize = "text-5xl";
      break;
    case size:
      titleSize = `text-[${size}px]`;
      break;
  }
  return <h1 className={`${titleSize} uppercase ${center ? 'text-center' : ''}`}>{children}</h1>;
}
