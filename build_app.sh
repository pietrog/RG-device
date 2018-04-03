#! /bin/sh

help="usage: build_app [-b|--build release|debug] [-A|--apk-name] [--alias-name] [--key-name] [-k|--gen-key]\n
\t-b, --build\t build the app in release or debug mode (ex: --build --debug or --build --release)\n
\t-k, --gen-key\t generate security key via RSA algorithm\n
\t-s|--sign\t signe l'apk
";

aliasname="rg-alias"
apkname="rg-stats.apk"
keyname="rg-security-key.jks"

if [ $# -eq 0 ]
then
    echo $help;
    exit 1;
else
    while [ $# -gt 0 ]	  
    do
	key="$1";
	case $key in
	    -b | --build )
		mode="$2";
		build=true
		shift;
		shift;;
	    -h | --help )
		echo "$help";;
	    -k | --gen-key )	      
		genkey=true;
		shift;;
	    -s | --sign )
		signapk=true;
		shift;;
	    * )
		echo $help;
		exit 1;;
	esac
    done
fi

if [ -n "$genkey" ]
then

    if [ -z "$keyname" -o -z "$aliasname" ]
    then
	echo "error: quand vous generez la clef (-k|--genkey), vous devez passer le nom de la clef via --key-name, ainsi que l'alias via --alias-name";
	echo $help;
	exit 1;
    fi

    echo "Generation de la clef de sécurité";
    keytool -genkey -v -keystore "$keyname" -keyalg RSA -keysize 2048 -validity 10000 -alias "$aliasname"
    echo "Clef de sécurité générée";
fi

if [ -n "$build" ]
then
    if [ -z "$apkname" ]
    then
	echo "error: vous devez spécifier le nom de l'app via -A ou --apk-name";
	echo "$help";
	exit 1;
    fi

    echo "Génération de l'apk $apkname";    
    ionic cordova build android --device --prod $mode;

    if [ ! -d "out" ]
    then
	mkdir out;
    fi

    if [ "$mode" = "--release" ]
    then
	apkext="release-unsigned.apk";
    elif [ "$mode" = "--debug" ]
    then
	apkext="debug.apk";
    fi
	
    mv "platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" "./out/$apkname"
fi


if [ -n "$signapk" ]
then
    if [ -z "$keyname" -o -z "$apkname" -o -z "$aliasname" ]
    then
	echo "error: quand vous signez l'app, vous devez fournir le nom de la clef via --key-name, l'alias via --alias-name ainsi que le nom de l'apk via --apk"
	echo $help;
	exit 1;
    fi
    echo "Signature de l'apk";
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keyname "./out/$apkname" $aliasname
    zipalign -v 4 "./out/$apkname" "rg.apk"
fi
