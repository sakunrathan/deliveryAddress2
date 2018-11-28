import { environment } from '../../../environments/environment';
export const ConstMaster = {
    S3_ENDPOINT : {
        url : 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/'
    },
    header : {
        jsonFileEndPoints: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/json/HeaderMenu.json'
    },
    home : {
        jsonFileEndPoints: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/json/EventBanner.json'
    },
    imageBreakpoint : [
        {
            breakpoint: 768,
            beakpointName: 'sd'
        },
        {
            breakpoint: 1366,
            beakpointName: 'hd'
        },
        {
            breakpoint: 1920,
            beakpointName: 'fullhd'
        }
    ],
    PROVINCE_API: {
        endpoint: environment.apiGatewayProvince
    },
    DELVERY_API: {
        endpointAddress: environment.apiGatewayDelveryAddr + 'get_address',
        endpointInsertDelivery: environment.apiGatewayDelveryAddr + 'insertDelivery'
    }
};
