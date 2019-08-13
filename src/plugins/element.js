import Vue from '../init';
import {
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Input,
    InputNumber,
    Button,
    ButtonGroup,
    Select,
    Alert,
    Option,
    Form,
    FormItem,
    Table,
    TableColumn,
    Link,
    Row,
    Col,
    Image,
    Tag,
    Upload,
    Pagination,
    DatePicker,
    Checkbox,
    Dialog,
    Card,
    Loading,
    Timeline,
    TimelineItem,
    InfiniteScroll,
    Notification,
    Radio,
    PageHeader,
    Avatar,
    Switch
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/sk';
import locale from 'element-ui/lib/locale';

locale.use(lang);
Vue.prototype.$notify = Notification;
Vue.use(Menu);
Vue.use(Card);
Vue.use(Alert);
Vue.use(Avatar);
Vue.use(InputNumber);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Loading);
Vue.use(InfiniteScroll);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Button);
Vue.use(Image);
Vue.use(ButtonGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(PageHeader);
Vue.use(Radio);
Vue.use(Switch);