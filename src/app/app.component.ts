import { Component, OnInit, OnDestroy } from '@angular/core';
import { BraodcastService } from './domain/service/broadcast-service';
import { IS_LOGIN, BACkEND_URL, TOKEN, LOGIN_USER, ACTIVE_MENU } from './domain/constant/constants';
import { XhrContext, HttpResponse, ResponseFilter, AbstractRequestFilter, HttpClientConfig } from "@rxweb/http"
import { ReactiveFormConfig, ErrorMessageBindingStrategy } from '@rxweb/reactive-form-validators';
import { NotificationService } from './domain/service/notification/notificaiton-service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SignalRService } from './domain/service/signal-r.service';
import { StorageService } from './domain/service/storage-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.grid.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';
  isLogin: boolean = false;
  showComponent: boolean = false;
  routeData: any;
  constructor(
    private braodcastService: BraodcastService,
    private notificationService: NotificationService,
    private router: Router, private route: ActivatedRoute,
    private signalRService: SignalRService,
    private storageService: StorageService,
  ) {
    this.braodcastService.sendDataSusciber.subscribe(data => {
      if (data) {
        this.isLogin = true;
      }
    })
    router.events
      .forEach(e => {
        if (e instanceof NavigationEnd) {
          if (route.root.firstChild.snapshot.data) {
            this.routeData = route.root.firstChild.snapshot.data;
          }
        }
      })

    HttpClientConfig.register({
      hostURIs: [{
        name: 'local',
        default: true,
        uri: BACkEND_URL
      }],
      filters: [{ model: AuthFilter }],
      onError: (r) => {
        let data = document.getElementById("loader");
        data.classList.remove("loading")
        this.notificationService.error("Error occurred")
        this.storageService.remove(IS_LOGIN);
        this.storageService.remove(TOKEN);
        this.storageService.remove(LOGIN_USER);
        this.storageService.remove(ACTIVE_MENU);
        setTimeout(() => {
         window.location.href = "/login";
        }, 1000);
      }
    })
  }

  ngOnInit(): void {
	  this.signalRService.start();
    let isLogined = (localStorage.getItem(IS_LOGIN) === 'true');
    if (isLogined) {
      document.body.className = "hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed";
      this.isLogin = true;
    }
    else {
      document.body.className = "hold-transition login-page";
      this.isLogin = false;
    }
    ReactiveFormConfig.set({
      "reactiveForm": {
        "errorMessageBindingStrategy": ErrorMessageBindingStrategy.OnSubmit
      },
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "alpha": "Only alphabelts are allowed.",
        "alphaNumeric": "Only alphabet and numbers are allowed.",
        "compare": "inputs are not matched.",
        "contains": "value is not contains in the input",
        "creditcard": "creditcard number is not correct",
        "digit": "Only digit are allowed",
        "email": "email is not valid",
        "greaterThanEqualTo": "please enter greater than or equal to the joining age",
        "greaterThan": "please enter greater than to the joining age",
        "hexColor": "please enter hex code",
        "json": "please enter valid json",
        "lessThanEqualTo": "please enter less than or equal to the current experience",
        "lessThan": "please enter less than or equal to the current experience",
        "lowerCase": "Only lowercase is allowed",
        "maxLength": "maximum length is exceeded",
        "maxNumber": "enter value less than equal to 3",
        "minNumber": "enter value greater than equal to 1",
        "password": "please enter valid password",
        "pattern": "please enter valid zipcode",
        "range": "please enter age between 18 to 60",
        "required": "this field is required",
        "time": "Only time format is allowed",
        "upperCase": "Only uppercase is allowed",
        "url": "Only url format is allowed",
        "zipCode": "enter valid zip code",
        "minLength": "minimum length is 10 digit",
        "numeric": "Only numbers are allowed."
      }
    });
    this.showComponent = true;
  }

  ngOnDestroy(): void {
  }

}

export class AuthFilter extends AbstractRequestFilter implements ResponseFilter {

  onRequest = (context: XhrContext, ) => {
    let data = document.getElementById("loader");
    data.classList.add("loading")
    if (!(this.byPassApiList.find(x=>x === context.request.path))) {
      let Authorization = JSON.parse(localStorage.getItem(TOKEN));
      context.request.headers["Authorization"] = `${Authorization}`
    }

    this.onRequestExecuting(context);
  }

  onResponse = (response: HttpResponse) => {
    let data = document.getElementById("loader");
    data.classList.remove("loading")
    return response;
  }

  byPassApiList: any[] = ["UserAuthentication/ResetPassword","UserAuthentication/OtpVerification", "UserAuthentication/login","UserAuthentication/EmailVerification"]
}

