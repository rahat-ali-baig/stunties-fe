interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({
    title,
    subtitle,
}: PageHeaderProps) {
    return (
          <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-foreground/60 text-sm mt-1">{subtitle}</p>
        </div>
    );
}