import logging
logger = logging.getLogger(__name__)

class AuthRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label in ['auth', 'contenttypes']:
            logger.debug(f"Routing read of {model} to 'auth_db'")
            return 'auth_db'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label in ['auth', 'contenttypes']:
            logger.debug(f"Routing write of {model} to 'auth_db'")
            return 'auth_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        db_list = ['auth_db', 'default']
        if obj1._state.db in db_list and obj2._state.db in db_list:
            logger.debug(f"Allowing relation between {obj1} and {obj2}")
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in ['auth', 'contenttypes']:
            logger.debug(f"Routing migration of {app_label} to {db}")
            return db == 'auth_db'
        return db == 'default'
