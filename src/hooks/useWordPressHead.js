import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const useWordPressHead = (headContent) => {
  useEffect(() => {
    if (!headContent) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headContent;

    const currentHead = document.head;
    const newHeadElements = [];
    const elementIds = new Set();

    // Clear previously injected elements to prevent duplicates
    const oldElements = document.querySelectorAll('[data-wp-headless]');
    oldElements.forEach(el => el.remove());

    tempDiv.childNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        // Skip non-essential and problematic tags
        if (['TITLE', 'META', 'SCRIPT', 'LINK'].includes(node.tagName)) {
            let element;
            if (node.tagName === 'SCRIPT') {
                element = document.createElement('script');
                if (node.src) {
                    element.src = node.src;
                } else {
                    element.innerHTML = node.innerHTML;
                }
                if (node.type) element.type = node.type;
                if (node.id) element.id = node.id;
            } else if (node.tagName === 'LINK') {
                element = document.createElement('link');
                element.rel = node.rel;
                element.href = node.href;
                if(node.id) element.id = node.id;
                if(node.media) element.media = node.media;
            }

            if (element) {
                // Avoid duplicate scripts/styles
                const elementIdentifier = element.src || element.href || element.id;
                if (elementIdentifier && !elementIds.has(elementIdentifier)) {
                    element.setAttribute('data-wp-headless', 'true');
                    newHeadElements.push(element);
                    elementIds.add(elementIdentifier);
                }
            }
        }
    });

    // Append new elements
    newHeadElements.forEach(el => currentHead.appendChild(el));

    return () => {
        // Cleanup on component unmount
        newHeadElements.forEach(el => {
            if (currentHead.contains(el)) {
                currentHead.removeChild(el);
            }
        });
    };
  }, [headContent]);
};

const WordPressHelmet = ({ headContent }) => {
    if (!headContent) return null;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headContent;

    const title = tempDiv.querySelector('title')?.innerText || 'Sitio Headless';
    const metas = Array.from(tempDiv.querySelectorAll('meta')).map((meta, i) => (
        <meta key={i} {...meta.attributes} />
    ));

    return (
        <Helmet>
            <title>{title}</title>
            {metas}
        </Helmet>
    );
};

export { useWordPressHead, WordPressHelmet };