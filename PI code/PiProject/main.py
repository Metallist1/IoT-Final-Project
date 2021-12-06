import pygame
import datetime
import time
from MQTT.alarm import c
from MQTT.mqtt import MQTTClass

def play_speaker():
    if not pygame.mixer.music.get_busy():
        pygame.mixer.music.load("./Songs/myfile.wav")
        pygame.mixer.music.play()

def stop_speaker():
    pygame.mixer.music.stop()


def should_play_alarm():
    for x in c.get_alarm_list():
        if x.get_start_time() < now < x.get_end_time():
            return True
    return False

if __name__ == '__main__':
    MQTTClass()
    starttime = time.time()
    pygame.mixer.init()
    while True:
        print("tick")
        for x in c.get_alarm_list():
            print(x)
        now = datetime.datetime.now()
        if should_play_alarm(): #and weight is positive

            if not pygame.mixer.music.get_busy():
                play_speaker()

        elif pygame.mixer.music.get_busy():
            stop_speaker()

        time.sleep(10.0 - ((time.time() - starttime) % 10.0))
