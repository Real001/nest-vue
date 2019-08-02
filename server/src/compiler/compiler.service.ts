import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class CompilerService {
  constructor(private readonly http: HttpService) {}

  async submissionsPost(code: string) {
    this.http.post('localhost:3000/submissions', { source_code: code, language_id: 29 })
      .toPromise()
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }

}
