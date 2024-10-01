import React from 'react';

interface RenderHTMLContentProps {
    htmlContent: string;
}

const RenderHTMLContent: React.FC<RenderHTMLContentProps> = ({ htmlContent }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default RenderHTMLContent;
