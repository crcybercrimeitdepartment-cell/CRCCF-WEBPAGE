import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { ROUTE_METADATA } from '../../constants/routes';
import SEO from './SEO';

const RouteMetadata = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  let matchedMeta = null;

  // First try exact match
  matchedMeta = ROUTE_METADATA.find(meta => meta.path === currentPath);

  // If not found, try route pattern matching (for dynamic routes like /gallery/category/:id)
  if (!matchedMeta) {
    matchedMeta = ROUTE_METADATA.find(meta => {
      // Don't match the wildcard paths blindly unless it's a fallback
      if (meta.path.endsWith('*')) return false; 
      const match = matchPath({ path: meta.path, end: true }, currentPath);
      return match !== null;
    });
  }
  
  // If still not found, try wildcard paths like /services/*
  if (!matchedMeta) {
    matchedMeta = ROUTE_METADATA.find(meta => {
      if (meta.path.endsWith('*')) {
        const basePath = meta.path.replace('/*', '');
        return currentPath.startsWith(basePath);
      }
      return false;
    });
  }

  // Fallback metadata if no route matches at all
  if (!matchedMeta) {
    matchedMeta = {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist on CR Cyber Crime Foundation.'
    };
  }
  
  // Construct canonical url
  const canonicalUrl = `https://crccf.org${currentPath}`;

  return (
    <SEO 
      title={matchedMeta.title} 
      description={matchedMeta.description} 
      url={canonicalUrl} 
    />
  );
};

export default RouteMetadata;
