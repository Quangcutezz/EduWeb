import React from 'react';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

const FacebookEmbed: React.FC = () => {
    const facebookPostUrl =
        'https://www.facebook.com/groups/375816444755897/?hoisted_section_header_type=recently_seen&multi_permalinks=604201161917423';

    return (
        <FacebookProvider appId="421168513925628">
            <EmbeddedPost href={facebookPostUrl} width="100%" />
        </FacebookProvider>
    );
};

export default FacebookEmbed;
