import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';

const RESUME_PATH = 'http://static.bhashkar.me/resume.pdf';

export const loader: LoaderFunction = () => {
    return redirect(RESUME_PATH);
};
