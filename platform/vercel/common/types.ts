// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface StackFile {
    provider: Provider;
    functions: Record<string, StackFunction>;
}

export interface Provider{
    name: string;
}

export interface StackFunction{
    bootstrap: string;
    environment: Record<string, string>;
    environment_file: string[];
    secret_file: string[];
}

export interface SyncStackFile {
    provider: Provider;
    functions: Record<string, SyncStackFunction>;
}

export interface SyncStackFunction{
    bootstrap: string;
    environment: Record<string, string>;
    secret: Record<string, string>;
}
