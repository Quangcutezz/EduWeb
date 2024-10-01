import { useMemo } from 'react';
import { useNavigate, NavigateOptions, To } from 'react-router-dom';

interface Router {
    back: () => void;
    forward: () => void;
    reload: () => void;
    push: (href: string) => void;
    replace: (href: string, options?: NavigateOptions) => void;
}

export function useRouter(): Router {
    const navigate = useNavigate();

    const router = useMemo(
        () => ({
            back: () => navigate(-1),
            forward: () => navigate(1),
            reload: () => window.location.reload(),
            push: (href: To) => navigate('/' + href, { replace: false }),
            replace: (href: To, options: NavigateOptions | undefined) => navigate(href, { replace: true, ...options }),
        }),
        [navigate],
    );

    return router;
}
