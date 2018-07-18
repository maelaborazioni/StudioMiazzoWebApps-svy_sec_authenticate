/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F1E068ED-6929-451B-AE08-52226E34CC64"}
 */
var svy_sec_a_version = '6.0.1.86';

/**
 * @properties={typeid:24,uuid:"91ADC699-A070-4781-99B7-3A969D239382"}
 */
function svy_sec_getOwnerName(_owner_id, _framework_db) {
	var _query = 'SELECT name\
					FROM sec_owner\
					WHERE owner_id = ?'
	var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_owner_id],2000)
	if(_dataset.getValue(1,1))
	{
		return _dataset.getValue(1,1)
	}
	else
	{
		return false
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param _owner_name
 * @param _framework_db
 *
 * @properties={typeid:24,uuid:"8F3A8D3D-213F-4850-BE38-8C31397FFCCC"}
 */
function svy_sec_getOwnerIdByName(_owner_name, _framework_db) {
	var _query = 'SELECT owner_id \
					FROM sec_owner \
					WHERE name = ?'
	var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_owner_name],-1)
	if(_dataset.getValue(1,1))
		return _dataset.getValue(1,1);
	else
		return false;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} _owner_name
 * @param {String} _framework_db
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"D138C03F-0AE0-47A2-8EEE-579EE0EECC0A"}
 */
function svy_sec_getOwnerFromName(_owner_name, _framework_db) {
	var _query = 'SELECT owner_id \
					FROM sec_owner \
					WHERE name = ?'
	var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_owner_name],-1)
	if(_dataset.getMaxRowIndex() == 1 && _dataset.getValue(1,1))
		return _dataset.getValue(1,1)
	else
		return null;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} _owner_id
 * @param {String} _organization_name
 * @param {String} _framework_db
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"2585C3D1-E56E-4FC9-8650-45D825AFA462"}
 */
function svy_sec_getOrganizationFromOwnerOrganization(_owner_id,_organization_name, _framework_db) {
	var _query = 'SELECT organization_id, owner_id, name, is_client, login_enabled \
                  FROM sec_organization \
                  WHERE owner_id = ? AND name = ?';
	var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_owner_id,_organization_name],-1)
	if(_dataset.getMaxRowIndex() == 1 && _dataset.getValue(1,1))
		return _dataset.getValue(1,1)
	else
		return null;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} _user_name
 * @param {String} _owner_id
 * @param {String} _framework_db
 * 
 * @return {Number}
 * 
 * @properties={typeid:24,uuid:"3326A3FA-52C3-4593-B443-A81685EFA45F"}
 */
function svy_sec_getUserFromName(_user_name, _owner_id, _framework_db)
{
   var _query = 'SELECT user_id, owner_id, user_locked \
   				 FROM sec_user WHERE user_name = ? \
   				 AND owner_id = ? \
                 AND user_locked is null';		
   
   var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_user_name,_owner_id],-1)
   if(_dataset.getMaxRowIndex() == 1 && _dataset.getValue(1,1))
      return _dataset.getValue(1,1)
   else
	  return null;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} _user_id
 * @param {String} _owner_id
 * @param {String} _framework_db
 *
 * @properties={typeid:24,uuid:"6A72F1F2-FD3A-425C-A106-107111881B42"}
 */
function svy_sec_getUserName(_user_id, _owner_id, _framework_db)
{
   var _query = 'SELECT user_name \
   				 FROM sec_user WHERE user_id = ? \
   				 AND owner_id = ? \
                 AND user_locked is null';		
   
   var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_user_id,_owner_id],-1)
   if(_dataset.getMaxRowIndex() == 1 && _dataset.getValue(1,1))
      return _dataset.getValue(1,1)
   else
	  return null;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} _user_org_id
 * @param {String} _framework_db
 * 
 * @properties={typeid:24,uuid:"8D9AF7CC-5DC0-4FCD-8E08-43AA0370F793"}
 */
function svy_sec_getUserFromUserOrgId(_user_org_id,_framework_db)
{
	var _query = 'SELECT user_id \
			 	  FROM sec_user_org WHERE user_org_id = ?';		

	var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_user_org_id],-1)
	if(_dataset.getMaxRowIndex() == 1 && _dataset.getValue(1,1))
		return _dataset.getValue(1,1)
	else
		return null;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} _user_org_id
 * @param {String} _framework_db
 *
 * @properties={typeid:24,uuid:"E36188CB-1A20-455B-AE81-1A45E4418728"}
 */
function svy_sec_getOrganizationFromUserOrgId(_user_org_id,_framework_db)
{
	var _query = 'SELECT organization_id \
				  FROM sec_user_org \
				  WHERE user_org_id = ?';		

	var _dataset = databaseManager.getDataSetByQuery(_framework_db,_query,[_user_org_id],-1)
	if(_dataset.getMaxRowIndex() == 1 && _dataset.getValue(1,1))
		return _dataset.getValue(1,1)
	else
		return null;
}

/**
 * @param {{owner:String, framework_db:String}} _authObj
 * @properties={typeid:24,uuid:"96504B4F-7613-4971-A81E-E62BB781E132"}
 */
function svy_sec_validateHash(_authObj) {
	if (globals.svy_sec_needHashCheck()) {
		//check if the hash is correct
		if (!globals.svy_sec_checkHash(_authObj.owner, _authObj.framework_db)) {
			return false;
		}
	}
	return true;
}

/**
 * @param {{framework_db:String}} _authObj
 * @properties={typeid:24,uuid:"51F48656-8640-4F2A-A59B-1580B3E75DA8"}
 */
function svy_sec_recalculateHash(_authObj) {
	globals.svy_sec_saveHash(null, _authObj.framework_db);
}

/**
 * @param {{username:String,owner:String,password:String,firstLoginAttempt:Date,lastLoginAttempt:Date, framework_db:String}} _authObj
 * @properties={typeid:24,uuid:"0F1C1587-98F8-4BC4-BD26-CB44CEE5B4A8"}
 * @AllowToRunInFind
 */
function svy_sec_checkUserPassword(_authObj) {
		
	//query's the user from the database
	var maxReturnedRows = 1;//useful to limit number of rows
	var query = '	SELECT			sec_user.user_id, \
									sec_user.user_locked, \
									sec_user_password.end_date, \
									sec_user_password.password_value, \
									sow.license_amount, \
									sow.owner_id, \
									sow.password_times_wrong, \
									sow.password_input_interval, \
									sow.password_timespan_before_lock \
					FROM			sec_user, \
									sec_user_password, \
									sec_owner sow \
					WHERE (EXISTS \
									(SELECT	* \
									FROM	sec_user_org, \
											sec_organization, \
											sec_owner \
									WHERE	sec_user.user_id = sec_user_org.user_id \
									AND		sec_user_org.organization_id = sec_organization.organization_id \
									AND		sec_organization.owner_id = sec_owner.owner_id \
									AND		sec_owner.owner_id = sow.owner_id \
									AND		sec_owner.name = ?) \
					OR (sec_user.flag_super_administrator = 1 \
					AND (EXISTS \
									(SELECT	* \
									FROM	sec_owner \
									WHERE	sec_owner.owner_id = sow.owner_id \
									AND		sec_owner.name = ?)))) \
					AND			sec_user.user_name = ? \
					AND 		sec_user.user_id = sec_user_password.user_id \
					ORDER BY	sec_user_password.start_date DESC';
	
	var args = new Array();
	args[0] = _authObj.owner
	args[1] = _authObj.owner
	args[2] = _authObj.username
	var dataset = databaseManager.getDataSetByQuery(_authObj.framework_db, query, args, maxReturnedRows);
	var _return = new Object()
	_return.success = false
		
	// check if the user violates the login attempt interval
	if (dataset.getValue(1, 8)) {
		var _passwordInputInterval = dataset.getValue(1, 8);
		/** @type {Date} */
		var _lastLoginAttempt = globals.getLastLoginAttempt(dataset.getValue(1, 1), _authObj.framework_db);
		
		if (_lastLoginAttempt && new Date().valueOf() - _lastLoginAttempt.valueOf() <= _passwordInputInterval * 1000) {
			// globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), false, 'Login interval violated', false);
			_return.error = 'svy.fr.dlg.password_interval';
			return _return;	
		}		
	}

	if(dataset.getValue(1, 1) && (dataset.getValue(1, 4) == utils.stringMD5HashBase64(_authObj.password)) && dataset.getValue(1, 2) != 1) {
		
		_return.license = dataset.getValue(1, 5);
		_return.owner_id = dataset.getValue(1, 6);
		_return.user_id =  dataset.getValue(1, 1);
		
		/** @type {String} */
		var _owner = _return.owner_id;
		// check if owner has enough licenses for this user to log in
		var _clientCount = application.getClientCountForInfo(_owner)
		if ((_return.license || _return.license == 0) && _clientCount >= _return.license) {
			globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), false, 'svy.fr.dlg.max_licenses', false, _authObj.framework_db);
			_return.error = 'svy.fr.dlg.max_licenses'
		} else {
			globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), true, null, false, _authObj.framework_db);
			_return.success = true;
		}
		
		return _return 
	} 
	else if (dataset.getValue(1,1) && dataset.getValue(1,2) == 1) //user is locked
	{
		// globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), false, 'User was already locked', false);
		_return.error = 'svy.fr.dlg.user_locked'
		return _return
	} else {
		// when a user uses a wrong password, we keep track in the user table
		
		// get the record of the user
		/** @type {JSFoundSet<db:/svy_framework/sec_user>} */
		var _fs_user = databaseManager.getFoundSet(_authObj.framework_db, 'sec_user');
		_fs_user.addFoundSetFilterParam('owner_id', '=', dataset.getValue(1, 6));
		_fs_user.addFoundSetFilterParam('user_name', '=', _authObj.username);
		_fs_user.loadAllRecords();

		if (databaseManager.hasRecords(_fs_user)) {
			globals.svy_sec_registerLoginAttempt(dataset.getValue(1, 1), false, 'svy.fr.dlg.wrong_password', true, _authObj.framework_db);
			
			if(!_fs_user.times_wrong_login) {
				_fs_user.times_wrong_login = 1;
			} else {
				_fs_user.times_wrong_login += 1;	
			}
			
			// when a user logs in with a wrong password too many times (and within the timespan) then lock the user
			if(dataset.getValue(1, 7) && dataset.getValue(1, 7) <= _fs_user.times_wrong_login) {
				if (dataset.getValue(1, 9)) {
					var _timespanBeforeLock = dataset.getValue(1, 9);
					/** @type {Number} */
					var _passwordTimesWrong = dataset.getValue(1, 7);
					
					/** @type {JSFoundSet<db:/svy_framework/sec_user_login_attempt>} */
					var _fs_loginAttempt = databaseManager.getFoundSet(_authObj.framework_db, 'sec_user_login_attempt');
					_fs_loginAttempt.find();
					_fs_loginAttempt.user_id = dataset.getValue(1, 1);
					_fs_loginAttempt.reason_include_timespan = 1;
					if (_fs_loginAttempt.search() >= dataset.getValue(1, 7)) {
						_fs_loginAttempt.sort('attempt_datetime desc');
						_fs_loginAttempt.setSelectedIndex(_passwordTimesWrong);
						
						if (new Date().valueOf() - _fs_loginAttempt.attempt_datetime.valueOf() >= _timespanBeforeLock * 60000) {
							return _return;
						}
					} else {
						return _return;
					}
				}
				
				_fs_user.user_locked = 1;
				_fs_user.user_locked_datetime = new Date();
				databaseManager.saveData();
				
				_return.error = 'svy.fr.dlg.user_locked';
				return _return;
			}
		}
		return _return;
	}
}

/**
 * @param {{username:String,password:String,framework_db}} _authObj
 * @properties={typeid:24,uuid:"218B4287-B55B-4617-9411-F01BF996AF7A"}
 * @AllowToRunInFind
 */
function svy_sec_checkUserPassword_http(_authObj) {
		
	//query's the user from the database
	var maxReturnedRows = 1;//useful to limit number of rows
	var query = '	SELECT			sec_user.user_id, \
									sec_user.user_locked, \
									sec_user_password.end_date, \
									sec_user_password.password_value, \
									sow.license_amount, \
									sow.owner_id, \
									sow.password_times_wrong, \
									sow.password_input_interval, \
									sow.password_timespan_before_lock \
					FROM			sec_user, \
									sec_user_password, \
									sec_owner sow \
					WHERE (EXISTS \
									(SELECT	* \
									FROM	sec_user_org, \
											sec_organization, \
											sec_owner \
									WHERE	sec_user.user_id = sec_user_org.user_id \
									AND		sec_user_org.organization_id = sec_organization.organization_id \
									AND		sec_organization.owner_id = sec_owner.owner_id \
									AND		sec_owner.owner_id = sow.owner_id \
									) \
					OR (sec_user.flag_super_administrator = 1 \
					AND (EXISTS \
									(SELECT	* \
									FROM	sec_owner \
									WHERE	sec_owner.owner_id = sow.owner_id \
									)))) \
					AND			sec_user.user_name = ? \
					AND 		sec_user.user_id = sec_user_password.user_id \
					ORDER BY	sec_user_password.start_date DESC';
	
	var args = new Array();
	args[0] = _authObj.username
	var dataset = databaseManager.getDataSetByQuery(_authObj.framework_db, query, args, maxReturnedRows);
	var _return = new Object()
	_return.success = false
		
	// check if the user violates the login attempt interval
	if (dataset.getValue(1, 8)) {
		var _passwordInputInterval = dataset.getValue(1, 8);
		/** @type {Date} */
		var _lastLoginAttempt = globals.getLastLoginAttempt(dataset.getValue(1, 1), _authObj.framework_db);
		
		if (_lastLoginAttempt && new Date().valueOf() - _lastLoginAttempt.valueOf() <= _passwordInputInterval * 1000) {
			// globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), false, 'Login interval violated', false);
			_return.error = 'svy.fr.dlg.password_interval';
			return _return;	
		}		
	}

	if(dataset.getValue(1, 1) && (dataset.getValue(1, 4) == utils.stringMD5HashBase64(_authObj.password)) && dataset.getValue(1, 2) != 1) {
		
		_return.license = dataset.getValue(1, 5);
		_return.owner_id = dataset.getValue(1, 6);
		_return.user_id =  dataset.getValue(1, 1);
		
		/** @type {String} */
		var _owner = _return.owner_id;
		// check if owner has enough licenses for this user to log in
		var _clientCount = application.getClientCountForInfo(_owner)
		if (_clientCount >= _return.license) {
			globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), false, 'svy.fr.dlg.max_licenses', false, _authObj.framework_db);
			_return.error = 'svy.fr.dlg.max_licenses'
		} else {
			globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), true, null, false, _authObj.framework_db);
			_return.success = true;
		}
		
		return _return 
	} 
	else if (dataset.getValue(1,1) && dataset.getValue(1,2) == 1) //user is locked
	{
		// globals.svy_sec_registerLoginAttempt(dataset.getValue(1,1), false, 'User was already locked', false);
		_return.error = 'svy.fr.dlg.user_locked'
		return _return
	} else {
		// when a user uses a wrong password, we keep track in the user table
		
		// get the record of the user
		/** @type {JSFoundSet<db:/svy_framework/sec_user>} */
		var _fs_user = databaseManager.getFoundSet(_authObj.framework_db, 'sec_user');
		_fs_user.addFoundSetFilterParam('owner_id', '=', dataset.getValue(1, 6));
		_fs_user.addFoundSetFilterParam('user_name', '=', _authObj.username);
		_fs_user.loadAllRecords();

		if (databaseManager.hasRecords(_fs_user)) {
			globals.svy_sec_registerLoginAttempt(dataset.getValue(1, 1), false, 'svy.fr.dlg.wrong_password', true, _authObj.framework_db);
			
			if(!_fs_user.times_wrong_login) {
				_fs_user.times_wrong_login = 1;
			} else {
				_fs_user.times_wrong_login += 1;	
			}
			
			// when a user logs in with a wrong password too many times (and within the timespan) then lock the user
			if(dataset.getValue(1, 7) && dataset.getValue(1, 7) <= _fs_user.times_wrong_login) {
				if (dataset.getValue(1, 9)) {
					var _timespanBeforeLock = dataset.getValue(1, 9);
					/** @type {Number} */
					var _passwordTimesWrong = dataset.getValue(1, 7);
					
					/** @type {JSFoundSet<db:/svy_framework/sec_user_login_attempt>} */
					var _fs_loginAttempt = databaseManager.getFoundSet(_authObj.framework_db, 'sec_user_login_attempt');
					_fs_loginAttempt.find();
					_fs_loginAttempt.user_id = dataset.getValue(1, 1);
					_fs_loginAttempt.reason_include_timespan = 1;
					if (_fs_loginAttempt.search() >= dataset.getValue(1, 7)) {
						_fs_loginAttempt.sort('attempt_datetime desc');
						_fs_loginAttempt.setSelectedIndex(_passwordTimesWrong);
						
						if (new Date().valueOf() - _fs_loginAttempt.attempt_datetime.valueOf() >= _timespanBeforeLock * 60000) {
							return _return;
						}
					} else {
						return _return;
					}
				}
				
				_fs_user.user_locked = 1;
				_fs_user.user_locked_datetime = new Date();
				databaseManager.saveData();
				
				_return.error = 'svy.fr.dlg.user_locked';
				return _return;
			}
		}
		return _return;
	}
}

/**
 * @param {String} _username
 * @param {Number} _user_id
 * @param {String} _organisation_id
 * @param {String} _framework_db
 * @properties={typeid:24,uuid:"F13F83E6-4E2E-466B-AF7E-63767F058E2E"}
 * @AllowToRunInFind
 */
function svy_sec_login(_username, _user_id, _organisation_id, _framework_db) {	
	/** @type {JSFoundSet<db:/svy_framework/sec_user_org>} */
	var _fsUserOrg = databaseManager.getFoundSet(_framework_db, 'sec_user_org');
	
	_fsUserOrg.find();
	_fsUserOrg.user_id = _user_id;
	_fsUserOrg.organization_id = _organisation_id;
	if (_fsUserOrg.search()) {
		if (security.login(_username, _fsUserOrg.user_org_id, ['users'])) {
			return _fsUserOrg.user_org_id;
		}
	} else {
		/** @type {JSFoundSet<db:/svy_framework/sec_user>} */
		var _fsUser = databaseManager.getFoundSet(_framework_db, 'sec_user');
		_fsUser.find();
		_fsUser.user_id = _user_id;
		if (_fsUser.search()) {
			if (_fsUser.flag_super_administrator) {
				if (security.login(_username, _username, ['users'])) {
					return 0;
				}
			}
		}
	}
	
	return -1;
}

/**
 * Verify if the passed token is valid on the current authorization system
 * 
 * @param {String} currentRefreshToken
 * 
 * @return {Boolean}
 * 
 * @author Giovanni
 * 
 * @properties={typeid:24,uuid:"BFDF770D-2F7B-4AE5-B97C-9860BA27171E"}
 */
function svy_sec_checkAccessToken(currentRefreshToken)
{
	var retValue = false;
	
	// submit passed token to the auth API and process response
	var url = 'https://api.studiomiazzo.it:1801/api/Authentication/Token';
	
//	var params = {clientId : 'apps.studiomiazzo.it',
//		          grantType : 'refresh_token',
//				  refreshToken : currentRefreshToken};
	
	var client = plugins.http.createNewHttpClient();
//	var jsonParams = plugins.serialize.toJSON(params).replace(/_([a-zA-Z0-9]+)(\\?":)/g, '$1$2');
				
	var request = client.createPostRequest(url);
	request.addHeader('Content-type','application/x-www-form-urlencoded');
//	request.addHeader('Content-type','application/json');
	request.addParameter('clientId','apps.studiomiazzo.it');
	request.addParameter('grantType','refresh_token');
	request.addParameter('refreshToken',currentRefreshToken);
	//request.setBodyContent(jsonParams);
	
	var response = request.executeRequest();
	if(response)
	{
		var responseBody = response.getResponseBody();
		var responseObj  = plugins.serialize.fromJSON(responseBody);
		var statusCode   = response.getStatusCode();
		
		switch (statusCode)
		{
			case 200:
				retValue = true;
				break;
			default:	
				break;	
		}		
	}
	
	return retValue;
}

/**
 * Get user properties for the login from the provided token
 * 
 * @param {String} access_token
 *
 * @return {{username : String, organization : String, owner : String}}
 * 
 * @properties={typeid:24,uuid:"DA11759F-69FE-479E-9B25-98D2A099E80F"}
 */
function svy_sec_getUserFromToken(access_token)
{
	var _userObj = {username : 'ASSISTENZA', organization : '', owner : 'DEMO'};
	return _userObj;
}

/**
 * Verify that the passed parameters are valid for a session (they define a single user for the organization and
 * the owner specified)
 * 
 * @param _user_id
 * @param _owner_id
 * @param [_organization_id]
 * @param [_framework_db]
 *
 * @properties={typeid:24,uuid:"E9DF82DA-280C-4AA7-9561-9E47BA77DF3B"}
 */
function svy_sec_checkUser(_user_id, _owner_id, _organization_id, _framework_db)
{
	var frameworkDb = _framework_db? _framework_db : 'svy_framework';
	
	var query = '	SELECT			sec_user.user_id, \
		sec_user.user_locked, \
		sow.license_amount, \
		sow.owner_i, \
		FROM			sec_user, \
		sec_owner sow \
WHERE (EXISTS \
		(SELECT	* \
		FROM	sec_user_org, \
				sec_organization, \
				sec_owner \
		WHERE	sec_user.user_id = sec_user_org.user_id \
		AND		sec_user_org.organization_id = sec_organization.organization_id \
		AND		sec_organization.owner_id = sec_owner.owner_id \
		AND		sec_owner.owner_id = sow.owner_id \
		AND		sec_owner.name = ?) \
      ) \
AND			sec_user.user_name = ?';
}

/**
 * @properties={typeid:24,uuid:"4E1E0E9E-4C64-4F5F-A6F0-758C9A8C52B2"}
 */
function svy_sec_getOrganizations(_user_id, _owner_id, _framework_db) {
	var _maxReturnedRows = -1
	var _query = '	SELECT		org.name, \
								org.organization_id \
					FROM		sec_user usr, \
								sec_organization org, \
								sec_user_org uo \
					WHERE		(usr.flag_super_administrator IS NULL \
					OR			usr.flag_super_administrator = 0) \
					AND			usr.user_id = uo.user_id \
					AND			uo.organization_id = org.organization_id \
					AND			usr.user_id = ? \
					AND			org.owner_id = ? \
					AND         org.login_enabled = true\
					UNION \
					SELECT		org.name, org.organization_id \
					FROM		sec_user usr, \
								sec_organization org \
					WHERE		usr.flag_super_administrator = 1 \
					AND			usr.user_id = ? \
					AND			org.owner_id = ? \
					AND         org.login_enabled = true\
					ORDER BY	1 ASC'
	
	var _args = new Array();
	_args[0] = _user_id
	_args[1] = _owner_id
	_args[2] = _user_id
	_args[3] = _owner_id
	var _dataset = databaseManager.getDataSetByQuery(_framework_db, _query, _args, _maxReturnedRows);
	
	return _dataset
}

/**
 * @properties={typeid:24,uuid:"9068CD55-076B-4E79-BF3A-4F3DE819B2D9"}
 */
function svy_sec_getWindowSize(_framework_db) {
	
	/** @type {JSFoundSet<db:/svy_framework/nav_properties> }*/
	var _fs = databaseManager.getFoundSet(_framework_db, 'nav_properties')
	_fs.addFoundSetFilterParam('property_name','=','framework_window_size')
	_fs.loadAllRecords()
	
	if(_fs.getSize() == 1)
	{
		var _returnValue;
		if (_fs.property_value instanceof java.util.ArrayList) {
			/** @type {java.util.ArrayList} */
			var _arrayList = _fs.property_value;
			_returnValue = _arrayList.toArray();
			return _returnValue[0];
		} else {
			/** @type {Array} */
			_returnValue = _fs.property_value;
			return _returnValue[0];
		}
	}
	else 
	{
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"559D5B1D-540B-4CDA-8B20-1F5ED4B2FC51"}
 */
function svy_sec_getForcedWindowSize(_framework_db) {
	
	/** @type {JSFoundSet<db:/svy_framework/nav_properties> }*/
	var _fs = databaseManager.getFoundSet(_framework_db, 'nav_properties')
	_fs.addFoundSetFilterParam('property_name','=','force_window_size')
	_fs.loadAllRecords()
	
	if(_fs.getSize() == 1)
	{
		return _fs.property_value[0]
	}
	else 
	{
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"0CBC4772-A738-4EC1-8DC8-E608CD87908B"}
 */
function svy_sec_registerLoginAttempt(_user_id, _is_successful, _reason_unsuccessful, _reason_include_timespan, _framework_db) {
	/** @type {JSFoundSet<db:/svy_framework/sec_user_login_attempt>} */
	var _fs_loginAttempt = databaseManager.getFoundSet(_framework_db, 'sec_user_login_attempt');
	_fs_loginAttempt.newRecord();
	_fs_loginAttempt.user_id = _user_id;
	_fs_loginAttempt.attempt_datetime = new Date();
	_fs_loginAttempt.is_successful = _is_successful;
	_fs_loginAttempt.reason_unsuccessful = _reason_unsuccessful;
	_fs_loginAttempt.reason_include_timespan = _reason_include_timespan;
	databaseManager.saveData(_fs_loginAttempt);
}

/**
 * @properties={typeid:24,uuid:"3911E929-D266-48DF-9EDA-7C6AC391E697"}
 * @AllowToRunInFind
 */
function getLastLoginAttempt(_user_id, _framework_db) {
	/** @type {JSFoundSet<db:/svy_framework/sec_user_login_attempt>} */
	var _fs_loginAttempt = databaseManager.getFoundSet(_framework_db, 'sec_user_login_attempt');
	_fs_loginAttempt.find();
	_fs_loginAttempt.user_id = _user_id;
	if (_fs_loginAttempt.search()) {
		_fs_loginAttempt.sort('attempt_datetime desc');
		_fs_loginAttempt.setSelectedIndex(1);
		return _fs_loginAttempt.attempt_datetime;
	}
	
	return null;
}