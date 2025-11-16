
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useWordPressHead, WordPressHelmet } from '@/hooks/useWordPressHead.jsx';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
    <div className="loader"></div>
  </div>
);

const ErrorDisplay = ({ message, onRetry }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error al cargar la página</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="flex gap-4">
                <button onClick={onRetry} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">Reintentar</button>
                <button onClick={() => navigate('/settings')} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">Ir a Configuración</button>
            </div>
        </div>
    );
};

const WordPressPage = () => {
  const [pageData, setPageData] = useState({ head: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const wordpressUrl = localStorage.getItem('wordpress_url');
  const pageSlug = slug || location.pathname.substring(1) || 'homepage'; // Fallback to homepage

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    if (!wordpressUrl) {
      setError('La URL de WordPress no está configurada.');
      setLoading(false);
      return;
    }

    try {
      // Use a proxy if available, or fetch directly. For local dev, a browser extension for CORS might be needed.
      const targetUrl = `${wordpressUrl.replace(/\/$/, "")}/${pageSlug === 'homepage' ? '' : pageSlug}`;
      const response = await fetch(targetUrl);
      
      if (!response.ok) {
        throw new Error(`No se pudo obtener la página. Estado: ${response.status}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const head = doc.head.innerHTML;
      const body = doc.body.innerHTML;

      setPageData({ head, body });
    } catch (err) {
      setError(`Error de red o CORS. Asegúrate de que la URL es correcta y tu WordPress es accesible. Detalles: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageSlug, wordpressUrl]);
  
  // Intercept navigation
  useEffect(() => {
    const handleClick = (e) => {
        let target = e.target.closest('a');
        if (target && target.href) {
            const targetUrl = new URL(target.href);
            const currentUrl = new URL(window.location.href);

            // If the link is internal to the WordPress site, prevent default and use React Router
            if (targetUrl.hostname === new URL(wordpressUrl).hostname) {
                e.preventDefault();
                navigate(targetUrl.pathname);
            }
        }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate, wordpressUrl]);

  useWordPressHead(pageData.head);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={fetchData} />;

  return (
    <>
      <WordPressHelmet headContent={pageData.head} />
      <div dangerouslySetInnerHTML={{ __html: pageData.body }} />
    </>
  );
};

export default WordPressPage;
