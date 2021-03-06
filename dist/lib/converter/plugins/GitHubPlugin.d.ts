import { ConverterComponent } from '../components';
export declare class GitHubPlugin extends ConverterComponent {
    private repositories;
    private ignoredPaths;
    gitRevision: string;
    initialize(): void;
    private getRepository;
    private onEndResolve;
}
