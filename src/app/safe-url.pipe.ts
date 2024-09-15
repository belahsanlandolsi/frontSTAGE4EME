import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string, type: 'url' | 'resourceUrl' = 'url'): SafeUrl {
    if (!url) return url;

    switch (type) {
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(url);
      default:
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
}