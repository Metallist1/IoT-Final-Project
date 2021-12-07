#
# Copyright 2021 HiveMQ GmbH
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import json
import datetime
import paho.mqtt.client as paho
from paho import mqtt

from MQTT.alarm import c


class MQTTSingleton:

    # empty list
    _instances = {}
    def __new__(class_, *args, **kwargs):
        if class_ not in class_._instances:
            class_._instances[class_] = super(MQTTSingleton, class_).__new__(class_, *args, **kwargs)
        return class_._instances[class_]

    def __init__(self):
        self.get_all_alarms()

    # setting callbacks for different events to see if it works, print the message etc.
    def on_connect(self, client, userdata, flags, rc, properties=None):
        print("CONNACK received with code %s." % rc)

    # with this callback you can see if your publish was successful
    def on_publish(self, client, userdata, properties=None):
        print("mid: " + str(userdata))

    # print which topic was subscribed to
    def on_subscribe(self, client, userdata, mid, granted_qos, properties=None):
        print("Subscribed: " + str(client)+ str(userdata) + str(mid) + " " + str(granted_qos))

    # print message, useful for checking if it was successful
    def on_message(self, client, userdata):
        if(userdata.topic =='alarms/getAll'):
            c.set_alarms(userdata.payload)
        elif (userdata.topic =='alarms/created'):
            c.add_alarm(userdata.payload)
        elif (userdata.topic =='alarms/deleted'):
            c.remove_alarm(userdata.payload)
        elif (userdata.topic == 'alarms/updated'):
            c.edit_alarm(userdata.payload)

    def change_sensor(self, value):
        print('Changed sensor to' + str(value))
        now = datetime.datetime.now().strftime("%Y/%m/%d, %H:%M:%S")

        # convert into JSON:
        y = json.dumps({
            "timestamp": now,
            "type": value
        })
        self.client.publish("sensor/change", payload=y, qos=1)
    def get_all_alarms(self):
        print('Gotten all alarms')
        self.client.publish("sensor/alarms/getAll", payload="", qos=1)

    # using MQTT version 5 here, for 3.1.1: MQTTv311, 3.1: MQTTv31
    # userdata is user defined data of any type, updated by user_data_set()
    # client_id is the given name of the client
    client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
    client.on_connect = on_connect

    # enable TLS for secure connection
    client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
    # set username and password
    client.username_pw_set("ned405", "Password123")
    # connect to HiveMQ Cloud on port 8883 (default for MQTT)
    client.connect("bb3263d7c44a4b7aa6f5a1e3b4ab626d.s2.eu.hivemq.cloud", 8883)

    # setting callbacks, use separate functions like above for better visibility
    client.on_subscribe = on_subscribe
    client.on_message = on_message
    client.on_publish = on_publish

    # subscribe to all topics of encyclopedia by using the wildcard "#"
    client.subscribe("alarms/getAll", qos=1)
    client.subscribe("alarms/created", qos=1)
    client.subscribe("alarms/updated", qos=1)
    client.subscribe("alarms/deleted", qos=1)

    # a single publish, this can also be done in loops, etc.
    # client.publish("sensor/alarms/getAll", payload="", qos=1)

    # loop_forever for simplicity, here you need to stop the loop manually
    # you can also use loop_start and loop_stop
    client.loop_start()

class MQTTClass(MQTTSingleton):
  pass

MQTTC = MQTTClass()