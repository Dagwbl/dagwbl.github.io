#!/bin/sh
# 这是一个混合脚本，同时兼容 Shell 和 PowerShell 的语法
# Linux/macOS 直接运行，Windows 需用 PowerShell 执行

# 判断操作系统类型
OS=""
case "$(uname -s)" in
    Linux*)     OS=Linux;;
    Darwin*)    OS=macOS;;
    CYGWIN*)    OS=Windows;;
    MINGW*)     OS=Windows;;
    *)          OS=UNKNOWN
esac

# 如果通过 PowerShell 运行，则执行 Windows 逻辑
if [ -n "$PSVersionTable" ]; then
    OS=Windows
fi

# 获取局域网 IP 的函数
get_ip() {
    if [ "$OS" = "Windows" ]; then
        # PowerShell 获取 DHCP 分配的 IPv4 地址
        powershell -Command "(Get-NetIPAddress | Where-Object { \$_.AddressFamily -eq 'IPv4' -and \$_.PrefixOrigin -eq 'Dhcp' }).IPAddress" | tr -d '\r'
    else
        # Linux/macOS 获取 IP（优先使用 ip 命令）
        (ip route get 1 2>/dev/null | awk '{print $7}' || ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | awk '{print $2}') | head -n 1
    fi
}

# 主逻辑
IP=$(get_ip)
if [ -z "$IP" ]; then
    echo "ERROR: 无法获取局域网 IP，请检查网络连接"
    exit 1
fi

echo "检测到本机 IP: $IP"
echo "Hugo 服务已启动：http://$IP:1313/"

# 启动 Hugo
hugo server -D --bind=0.0.0.0 --baseURL="http://$IP:1313/" --port=1313 --appendPort=false
