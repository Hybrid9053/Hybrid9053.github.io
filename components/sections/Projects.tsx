import { Section } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { categoryLabels, projects, type ProjectCategory } from "@/data/projects";

export function Projects() {
  const categories = Object.keys(categoryLabels) as ProjectCategory[];
  const counts: Record<string, number> = { all: projects.length };
  for (const c of categories) counts[c] = projects.filter((p) => p.categories.includes(c)).length;

  return (
    <Section
      id="work"
      index="03"
      eyebrow="Featured work"
      title="Engineering case studies."
      intro="Each project is labelled honestly — in development, research or experimentation. Open any card for the problem, approach and architecture."
    >
      <ProjectGrid categories={categories} counts={counts}>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} large={i < 2 || (i === projects.length - 1 && (projects.length - 2) % 2 === 1)} />
        ))}
      </ProjectGrid>
    </Section>
  );
}
