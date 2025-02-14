"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Linkedin } from "lucide-react";
import { siNextdotjs, siPostman, siPrisma, siVercel, siReact, siShadcnui, siTailwindcss, siPostgresql, siGithub } from "simple-icons";

export default function AboutApp() {
  const technologies = [
    {
      name: "Next.js",
      description: "A React framework for production, enabling server and client components.",
      icon: <div
      style={{ fill: `#000000` }}
      dangerouslySetInnerHTML={{ __html: siNextdotjs.svg }}
    />,
    },
    {
      name: "Prisma",
      description: "A modern database toolkit to simplify working with databases.",
      icon: <div
      style={{ fill: `#2D3748` }}
      dangerouslySetInnerHTML={{ __html: siPrisma.svg }}
    />,
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open-source relational database.",
      icon: <div
      style={{ fill: "#4169E1" }}
      dangerouslySetInnerHTML={{ __html: siPostgresql.svg }}
    />,
    },
    {
      name: "ShadCN UI",
      description: "Accessible components built with Radix UI and styled with Tailwind CSS.",
      icon: <div
      className="bg-black p-2 rounded-sm fill-white"
      dangerouslySetInnerHTML={{ __html: siShadcnui.svg }}
    />,
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for designing directly in markup.",
      icon: <div
      style={{ fill: `#06B6D4` }}
      dangerouslySetInnerHTML={{ __html: siTailwindcss.svg }}
    />,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-6 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">About This Application</h1>
        <p className="text-muted-foreground">
          A comprehensive overview of the tools and technologies that power this app.
        </p>
      </div>

      <Separator />

      {/* Technologies Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Technologies Used</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <Card key={tech.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center space-x-4">
                <div className="w-8 h-8">{tech.icon}</div>
                <div>
                  <CardTitle>{tech.name}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Documentation Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Documentation Overview</h2>
        <Card className="border-muted">
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              This application is built with modern web technologies to provide exceptional
              performance, scalability, and ease of development. Below is a brief breakdown:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Next.js:</strong> Combines server-side rendering, client-side navigation,
                and edge rendering for blazing-fast performance.
              </li>
              <li>
                <strong>Prisma:</strong> Simplifies database queries with a type-safe ORM.
              </li>
              <li>
                <strong>PostgreSQL:</strong> Reliable and robust data storage solution.
              </li>
              <li>
                <strong>ShadCN UI:</strong> Prebuilt components for seamless UI development.
              </li>
              <li>
                <strong>Tailwind CSS:</strong> A design system that enhances development speed and
                flexibility.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Contributors Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Contributors</h2>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Bode-Ajayi Akolade Victor</CardTitle>
            <CardDescription>Lead Developer & Architect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                <a
                  href="https://github.com/your-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  
                  <div
          style={{ fill: `#F05032` }}
          className="w-5 h-5"
          dangerouslySetInnerHTML={{ __html: siGithub.svg }}
        />
                  <span>GitHub</span>
                </a>
              </Badge>
              <Badge variant="outline">
                <a
                  href="https://linkedin.com/in/your-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
