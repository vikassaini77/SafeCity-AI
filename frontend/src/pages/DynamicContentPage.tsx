import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ContentPageTemplate } from '../components/enterprise';
import { productData, featureData } from '../data/contentData';

interface DynamicContentPageProps {
  type: 'product' | 'feature';
}

export default function DynamicContentPage({ type }: DynamicContentPageProps) {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) return <Navigate to="/dashboard" replace />;

  const data = type === 'product' ? productData[slug] : featureData[slug];

  if (!data) {
    return <Navigate to="/dashboard" replace />; // or 404
  }

  return <ContentPageTemplate {...data} />;
}
