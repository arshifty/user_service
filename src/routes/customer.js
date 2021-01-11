const router = require('express').Router();

const customerController = require('../controllers/customerController');

//homepage
router.get('/', customerController.home);
//user registration
router.get('/user_reg_home', customerController.user_reg_home);
router.post('/add', customerController.user_reg);
//see active services
router.get('/active_services', customerController.active_services);
//subscribe_unsubscribe
router.get('/subscribe_unsubscribe', customerController.subscribe_unsubscribe);
router.post('/submit_subscribe', customerController.submit_subscribe);
router.post('/search_unsubs', customerController.search_unsubs);
router.get('/update_subscription/:id', customerController.update_subscription);
router.post('/sub_updat/:id', customerController.sub_updat);
// delete all subscribed services
router.get('/delete_subscription/:id', customerController.delete_subscription);

//subscription list






module.exports = router;
