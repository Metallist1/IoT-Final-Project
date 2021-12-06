
import datetime
import json

class Alarm:
    def __init__(self, startTime, endTime, label, id):
        self.startTime = startTime
        self.endTime = endTime
        self.label = label
        self.id = id

    def get_start_time(self):
        x = self.startTime.split(":")
        now = datetime.datetime.now()
        return now.replace(hour=int(x[0]), minute=int(x[1]), second=0, microsecond=0)

    def get_end_time(self):
        x = self.endTime.split(":")
        now = datetime.datetime.now()
        return now.replace(hour=int(x[0]), minute=int(x[1]), second=0, microsecond=0)

    def __repr__(self):
        return "id: " + str(self.id) + " endTime: " + self.endTime + " startTime: " + self.startTime +" label: " + self.label

class Singleton(object):
    _instances = {}
    def __new__(class_, *args, **kwargs):
        if class_ not in class_._instances:
            class_._instances[class_] = super(Singleton, class_).__new__(class_, *args, **kwargs)
        return class_._instances[class_]

    def __init__(self):
        self.alarm_list = []

    def set_alarms(self, alarms):
        y = json.loads(alarms.decode('utf-8'))
        for alarmJson in y:
            self.alarm_list.append(Alarm(alarmJson['startTime'] , alarmJson['endTime'], alarmJson['label'], alarmJson['id']))

    def add_alarm(self, alarm):
        y = json.loads(alarm.decode('utf-8'))
        self.alarm_list.append(Alarm(y['startTime'] , y['endTime'], y['label'], y['id']))

    def remove_alarm(self, alarm):
        y = json.loads(alarm.decode('utf-8'))
        for i in range(len(self.alarm_list)):
            if self.alarm_list[i].id == y['id']:
                self.alarm_list.pop(i)
                break

    def edit_alarm(self, alarm):
        y = json.loads(alarm.decode('utf-8'))
        for i in range(len(self.alarm_list)):
            if self.alarm_list[i].id == y['id']:
                self.alarm_list[i] = Alarm(y['startTime'] , y['endTime'], y['label'], y['id'])
                break

    def get_alarm_list(self):
        return self.alarm_list


class AlarmClass(Singleton):
  pass

c = AlarmClass()