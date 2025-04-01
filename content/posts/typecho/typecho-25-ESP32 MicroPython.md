---
title: 'ESP32 MicroPython: Non-blocking Delays and Multithreading | Multitasking'
date: '2022-03-07T15:54:00Z'
slug: '25'
tags: []
categories:
  - typecho
---

![nonblock and multithreading][^1]

```python
import machine
import time

red = machine.Pin(27, machine.Pin.OUT)
grn = machine.Pin(26, machine.Pin.OUT)
blu = machine.Pin(25, machine.Pin.OUT)

mode = machine.Pin(33, machine.Pin.IN, machine.Pin.PULL_UP)
left = machine.Pin(32, machine.Pin.IN, machine.Pin.PULL_UP)
rght = machine.Pin(35, machine.Pin.IN)
entr = machine.Pin(34, machine.Pin.IN)

r_start = time.ticks_ms()
g_start = time.ticks_ms()
b_start = time.ticks_ms()
k_start = time.ticks_ms()

r_interval = 300
g_interval = 500
b_interval = 700
k_interval = 200

state = 0
EDIT_RESOLUTION = 10
reset = 0

print('**************************')
print('  DEFAULT Interval Values ')
print('--------------------------')
print('Red interval:', r_interval, 'ms')
print('Grn interval:', g_interval, 'ms')
print('Blu interval:', b_interval, 'ms')
print('**************************')

while True:
    if time.ticks_ms() - r_start >= r_interval:
        red.value( not red.value() )
        r_start = time.ticks_ms()
    if time.ticks_ms() - g_start >= g_interval:
        grn.value( not grn.value() )
        g_start = time.ticks_ms()
    if time.ticks_ms() - b_start >= b_interval:
        blu.value( not blu.value() )
        b_start = time.ticks_ms()
    if time.ticks_ms() - k_start >= k_interval:
        k_start = time.ticks_ms()

        if mode.value()==0:
            if state==0: # idle mode
                state = 1
                print()
                print('*************')
                print('Red edit mode')
                print('-------------')
            elif state==1: # red edit mode
                state = 2
                print()
                print('*************')
                print('Grn edit mode')
                print('-------------')
            elif state==2: # grn edit mode
                state = 3
                print()
                print('*************')
                print('Blu edit mode')
                print('-------------')
            elif state==3: # blu edit mode
                state = 0
                print()
                print('*************')
                print('Idle mode')
                print('-------------')

        if left.value()==0:
            if   state==1: # red edit mode
                if r_interval - EDIT_RESOLUTION > 0:
                    r_interval -= EDIT_RESOLUTION
                print('Red interval:', r_interval, 'ms')
            elif state==2: # grn edit mode
                if g_interval - EDIT_RESOLUTION > 0:
                    g_interval -= EDIT_RESOLUTION
                print('Grn interval:', g_interval, 'ms')
            elif state==3: # blu edit mode
                if b_interval - EDIT_RESOLUTION > 0:
                    b_interval -= EDIT_RESOLUTION
                print('Blu interval:', b_interval, 'ms')

        if rght.value()==0:
            if   state==1: # red edit mode
                r_interval += EDIT_RESOLUTION
                print('Red interval:', r_interval, 'ms')
            elif state==2: # grn edit mode
                g_interval += EDIT_RESOLUTION
                print('Grn interval:', g_interval, 'ms')
            elif state==3: # blu edit mode
                b_interval += EDIT_RESOLUTION
                print('Blu interval:', b_interval, 'ms')

        if entr.value()==0:
            r_interval = 300
            g_interval = 500
            b_interval = 700
            print()
            print('**************************')
            print('Values RESETTED to DEFAULT')
            print('--------------------------')
            print('Red interval:', r_interval, 'ms')
            print('Grn interval:', g_interval, 'ms')
            print('Blu interval:', b_interval, 'ms')
            print('**************************')

```

[^1]: https://1.bp.blogspot.com/-rYdcCBcd2K0/X26oBPSJclI/AAAAAAAACDc/jXve0NeUYHcXtYScTmdbod5hMptYgfJnwCLcBGAsYHQ/w640-h322/MP_009_Time.png
