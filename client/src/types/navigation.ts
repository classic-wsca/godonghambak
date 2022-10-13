export interface NavigationRoutes {
  text: string;
  href: string;
  subRoutes: Omit<NavigationRoutes, 'subRoutes'>[];
}
