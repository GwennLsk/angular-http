import { Component, OnInit } from '@angular/core';
import {Config, ConfigService} from '../config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  config = {
    heroesUrl: '',
    textfile: ''
  };
  headers = {};
  error = {};

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  showConfig() {
    this.configService.getConfig().subscribe(
      (data: Config) => this.config = {
      heroesUrl: data.heroesUrl,
      textfile: data.textfile
      },
      error => this.error = error );
  }

  showConfig2() {
    this.configService.getConfig2().subscribe((data: Config) => this.config = {...data});
  }

  showConfigResponse() {
    this.configService.getConfigRespoonse().subscribe(resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map(key => {
        return `${key}: ${resp.headers.get(key)}`;
      });
      this.config = {...resp.body};
    });
  }



}
