---
title: 单片机英文缩写的英文全称及中文名称
date: '2022-03-04T16:15:34Z'
slug: '20'
tags: []
categories:
  - typecho
---
## 汇编指令

 助记符      英文注释        功能
1   MOV    MOVe       传送
2   MOVC   MOVe Code  代码传送
3   PUSH   PUSH       压栈
4   POP    POP        退栈
5   XCH    eXCHange  交换
6   XCHD   eXCHange Decimal  十进制交换
7   ADD    ADD    加
8   ADDC   ADD with Carry   带进位加
9   SUBB   SUBbtract with  Borrow  带进位减
10  INC    INCrement       增量
11  DEC    DECrement       减量
12  MUL    MULtiply        乘
13  DIV    DIVide  除
14  DA     Decimal Adjust  十进制调整
15  ANL    Logical And    逻辑与
16  ORL    Logical OR    逻辑或
17  XRL    Logical eXclusive oR 逻辑异或
18  CPL    ComPLement     求补
19  CLR    CLeaR        清除
20  SETB   SET Bit   置位
21  RL     Rotate Left    循环左移
22  RR     Rotate Right   循环右移
23  RLC    Rotate Left  through the Carry flag 带进位循环左移
24  RRC    Rotate Right through the Carry flag 带进位循环右移
25  SWAP   SWAP  （半字节）互换
26  AJMP   Absolute JuMP   绝对转移
27  LJMP   Long JuMP  长跳转
28  SJMP   Short JuMP  短转移
29  JMP    JuMP  跳转
30  JZ     Jump if acc is Zero   累加器为零转移
31  JNZ    Jump if acc is Not Zero  累加器不为零转移
32  JC     Jump if Carry（if Cy=1） 进位位为1转移
33  JNC    Jump if Not Carry（if Cy=0） 进位位为0转移
34  JB     Jump if Bit is set（if Bit=1）指定位为1转移
35  JNB    Jump if Not Bit（if Bit=1）指定位为0转移
36  JBC    Jump if Bit is set and Clear bit 指定位等于1转移并清该位
37  CJNE   Compare and Jump if Not Equal 比较不相等转移
38  DJNZ   Decrement and Jump if Not Zero 减1不为0转移
39  ACALL  Absolute CALL  绝对调用
40  LCALL  Long CALL  长调用
41  RET    RETurn   子程序返回
42  RETI   RETurn from Interrupt 中断返回
43  NOP    No OPeration  空操作

**51单片机英文缩写全称
MCS-51指令**

**（1）数据传送类指令（7种助记符）
**助记符    英文注释    功能
MOV    Move          对内部数据寄存器RAM和特殊功能寄存器SFR的数据进行传送
MOVC    Move Code    读取程序存储器数据表格的数据传送
MOVX    Move External RAM    对外部RAM的数据传送
XCH    Exchange    字节交换
XCHD    Exchange low-order Digit    低半字节交换
PUSH    Push onto Stack)    入栈
POP    Pop from Stack)    出栈

**（2）算术运算类指令（8种助记符）
**ADD    Addition    加法
ADDC    Add with Carry    带进位加法
SUBB    Subtract with Borrow    带借位减法
DA    Decimal Adjust    十进制调整
INC    Increment    加1
DEC    Decrement    减1
MUL    Multiplication、Multiply    乘法
DIV    Division、Divide    除法

**(3)逻辑运算类指令（10种助记符）
**ANL    And Logic    逻辑与
ORL    OR Logic    逻辑或
XRL    Exclusive-OR Logic    逻辑异或
CLR    Clear    清零
CPL    Complement    取反
RL    Rotate left    循环左移
RLC    Rotate Left throught the Carry flag    带进位循环左移
RR    Rotate Right    循环右移
RRC    Rotate Right throught the Carry flag    带进位循环右移
SWAP    Swap    低4位与高4位交换

**(4)控制转移类指令（17种助记符）
**ACALL    Absolute subroutine Call    子程序绝对调用
LCALL    Long subroutine Call    子程序长调用
RET    Return from subroutine    子程序返回
RETI    Return from Interruption    中断返回
JMP    Jump Indirect
SJMP    Short Jump    短转移
AJMP    Absolute Jump    绝对转移
LJMP    Long Jump    长转移
CJNE    Compare and Jump if Not Equal    比较不相等则转移
DJNZ    Decrement and Jump if Not Zero    减1后不为0则转移
JZ    Jump if Zero    结果为０则转移
JNZ    Jump if Not Zero    结果不为０则转移
JC    Jump if the Carry flag is set    有进位则转移
JNC    Jump if Not Carry    无进位则转移
JB    Jump if the Bit is set)    B位为１则转移
JNB    Jump if the Bit is Not set    B位为０则转移
JBC    Jump if the Bit is set and Clear the bit    位为１则转移，并清除该位
NOP    No Operation    空操作

**（5）位操作指令（1种助记符）
**SETB    Set Bit    置位
伪指令
助记符    英文注释    功能
ORG    Origin
DB    Define Byte
DW    Define Word
EQU    Equal
DATA     Data
XDATA    External Data
BIT     Bit
END    End

**51外部引脚
缩写    英文解释    中文解释
**RST        （9）    Reset    复位信号引脚
RxD        (10--P3.0)    Receive Data    串口接收端
TxD        (11--P3.1)    Transmit Data    串口发送端
INT0(————)      （12--P3.2）   Interrupt0    外部中断0信号输入引脚
INT1(————)      （13--P3.3）   Interrupt1    外部中断1信号输入引脚
T0         (14--P3.4)    Timer0    定时/计数器0输入信号引脚
T1         (15--P3.5)    Timer1    定时/计数器1输入信号引脚
WR(———)        (16--P3.6)    write    写信号引脚
RD(———)        (17--P3.7)    read    读信号引脚
PSEN(—————)      （29）    progammer saving enable    外部程序存储器读选通信号
ALE       （30）    Address Latch Enable    地址锁存允许信号
EA(———)       (31)    enable    外部ROM选择信号

**51内部寄存器
**SFR    special funtion register    特殊功能寄存器
ACC    accumulate    累加器A
PSW    progammer status word    程序状态字
CY   (PSW.7)    carry    进位标志位
AC   (PSW.6)    assistant carry    辅助进位标志位
OV   (PSW.2)    overflow    溢出标志位
PC    progammer counter    程序计数器
DPTR    data point register    数据指针寄存器
SP    stack point    堆栈指针
TCON    timer control    定时器控制寄存器
TF1     （TCON.7）    Timer1 flag    T1中断标志位
TR1     （TCON.6）    Timer1 Run    T1运行控制位
TF0     （TCON.5）    Timer0 flag    T0中断标志位
TR0     （TCON.4）    Timer0 Run    T0运行控制位
IE1     （TCON.3）    Interrupt1 exterior    外部中断1中断标志位
IT1     （TCON.2）    Interrupt1 touch    外部中断1触发方式选择位
IE0     （TCON.1）    Interrupt0 exterior    外部中断0中断标志位
IT0     （TCON.0）    Interrupt0 touch    0-电平触发；1-下降沿触发
IE   （A8H）    interrupt enable    中断允许寄存器
EA        (IE.7)    enable all interrupt    中断总允许位
ES        (IE.4)    enable serial    串行口中断允许位
ET1      （IE.3）    enable timer 1    T1中断允许位
EX1      （IE.2）    enable exterior 1    外部中断1中断允许位
ET0      （IE.1）    enable timer 0    T0中断允许位
EX0      （IE.0）    enable exterior 0    外部中断0中断允许位
IP    （B8H）    interrupt priority    中断优先级寄存器
PS     (IP.4)    priority serial    串口优先级标志位
PT1    (IP.3)    priority timer 1    定时器1优先级标志位
PX1    (IP.2)    priority exterior 1    外部中断1优先级标志位
PT0    (IP.1)    priority timer 0    定时器0优先级标志位
PX0    (IP.0)    priority exterior 0    外部中断0优先级标志位
PCON    (87H)    power control    电源控制和波特率选择
TMOD   （89H）    timer mode    定时器方式控制寄存器

MSB = most significant bit//最高有效位
LSB = last significant bit//最低有效位
