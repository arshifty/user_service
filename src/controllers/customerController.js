const controller = {};


controller.home = (req, res) => {
   
    res.render('homepage') 
 
};


controller.user_reg_home = (req, res) => {
   
      
    res.render('user_registration') 
 
};

controller.user_reg = (req, res) => {
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO user set ?', data, (err, customer) => {
            console.log(customer);
            res.redirect('/');
        })
    })
};



controller.active_services = (req, res) => {
   
   
     req.getConnection((err, conn) => {
        conn.query('SELECT * FROM service', (err, see_active_services) => {
            if (err) {
                res.json(err);
            }
            res.render('see_active_services', {
                data: see_active_services
            });
        });
    });      
    
 
};


controller.subscribe_unsubscribe = (req, res) => {
   
      
    res.render('subscribe_unsubscribe') 
 
};


controller.submit_subscribe = (req, res) => {
	
    const data = req.body;
	const sports =  req.body['sports'];
	const phone =  req.body['phone'];
	 
	 console.log(req.body['phone']);  
	  console.log(req.body['sports']);
	  
	
    console.log(req.body);
    req.getConnection((err, connection) => {
		
        const query = connection.query('INSERT INTO user_service set ?', data, (err, customer) => {
            console.log(customer);
           // res.redirect('/subscribe_unsubscribe');
        })
		
		
		connection.query("SELECT * FROM user_service,user WHERE user_service.phone= ? AND user.phone=?",  [phone , phone] , (err, rows) => {
            res.render('subscription_list', {
                data: rows
            })
        });
		
		
		
    })
};


controller.search_unsubs = (req, res) => {
	
	 const data = req.body;
	 
	  console.log(req.body);
	 console.log(data);
	 
	  console.log(data.phone);
	  
	    const phonedata = data.phone;
	 console.log("semester data "+phonedata);
	
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM user_service WHERE phone = ?", [phonedata], (err, rows) => {
            res.render('unsubscribe_services', {
                data: rows
            })
        });
    });

};


controller.update_subscription = (req, res) => {
   
const {id} = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM user_service WHERE id = ?", [id], (err, rows) => {
            res.render('update_subscribe_data', {
                data: rows[0]
            })
        });
    });

   
};





controller.sub_updat = (req, res) => {
    const {id} = req.params;
    const newCustomer = req.body;
	
	if(newCustomer.sports=="off"  &&  newCustomer.news=="off"  &&  newCustomer.health=="off"  && newCustomer.namaz=="off")
	{
		
		newCustomer.is_subscribed=0;
	}
	else
	{
		newCustomer.is_subscribed=1;
		
	}
	
	console.log(newCustomer.sports);
	console.log(newCustomer.news);
	
	const phone = newCustomer.phone;
	
	 console.log(req.body);
	
    req.getConnection((err, conn) => {

        conn.query('UPDATE user_service set ? where id = ?', [newCustomer, id], (err, rows) => {
           // res.redirect('/');
        });
		
		//conn.query("SELECT * FROM user_service WHERE phone = ?", [phone], (err, rows) => {
		//SELECT * FROM user_service,user WHERE user_service.phone='01521466521' AND user.phone='01521466521'
		
		conn.query("SELECT * FROM user_service,user WHERE user_service.phone= ? AND user.phone=?",  [phone , phone] , (err, rows) => {
            res.render('After_Unsubscribe_New_Subscription_list', {
                data: rows
            })
        });
		
		
    });
};




controller.delete_subscription = (req, res) => {
    const {id} = req.params;
	
	 console.log("delated");
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM user_service WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};
















//past 
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM student', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body);
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO student set ?', data, (err, customer) => {
            console.log(customer);
            res.redirect('/');
        })
    })
};


controller.semester = (req, res) => {
	
	 const data = req.body;
	 
	  console.log(req.body);
	 console.log(data);
	 
	  console.log(data.semester);
	  
	    const semsdata = data.semester;
	 console.log("semester data "+semsdata);
	
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM student WHERE semester = ?", [semsdata], (err, rows) => {
            res.render('semestercustomer', {
                data: rows
            })
        });
    });

};

controller.search = (req, res) => {
	
	 const data = req.body;
	 
	  console.log(req.body);
	 console.log(data);
	 
	  console.log(data.roll);
	  
	    const rolldata = data.roll;
	 console.log("roll data "+rolldata);
	
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM student WHERE roll = ?", [rolldata], (err, rows) => {
            res.render('searchcustomer', {
                data: rows
            })
        });
    });

};


controller.edit = (req, res) => {
    const {id} = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM student WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
    });
};




controller.update = (req, res) => {
    const {id} = req.params;
    const newCustomer = req.body;
	
	 console.log(req.body);
	
    req.getConnection((err, conn) => {

        conn.query('UPDATE student set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const {id} = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM student WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;
