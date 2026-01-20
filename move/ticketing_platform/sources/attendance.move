/// Attendance NFT module for proof-of-presence rewards
module ticketing_platform::attendance {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use sui::clock::{Self, Clock};
    use ticketing_platform::event::{Self, Event};
    use ticketing_platform::ticket::{Self, Ticket};

    /// Error codes
    const ENotOrganizer: u64 = 1;
    const ETicketNotUsed: u64 = 2;

    /// Attendance NFT (Proof of Presence)
    public struct AttendanceNFT has key, store {
        id: UID,
        event_id: ID,
        attendee: address,
        check_in_time: u64,
        metadata: String,
        event_name: String
    }

    /// Attendance recorded event
    public struct AttendanceRecorded has copy, drop {
        nft_id: ID,
        event_id: ID,
        attendee: address,
        check_in_time: u64
    }

    /// Issue attendance NFT after ticket verification
    public entry fun issue_attendance_nft(
        event: &Event,
        ticket: &Ticket,
        metadata: vector<u8>,
        event_name: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Only organizer can issue attendance NFTs
        assert!(event::get_organizer(event) == tx_context::sender(ctx), ENotOrganizer);
        // Ticket must be verified/used
        assert!(ticket::is_used(ticket), ETicketNotUsed);

        let attendee = ticket::get_owner(ticket);
        let nft = AttendanceNFT {
            id: object::new(ctx),
            event_id: event::get_event_id(event),
            attendee,
            check_in_time: clock::timestamp_ms(clock),
            metadata: string::utf8(metadata),
            event_name: string::utf8(event_name)
        };

        event::emit(AttendanceRecorded {
            nft_id: object::uid_to_inner(&nft.id),
            event_id: nft.event_id,
            attendee,
            check_in_time: nft.check_in_time
        });

        transfer::transfer(nft, attendee);
    }

    /// Burn attendance NFT (optional)
    public entry fun burn_attendance_nft(
        nft: AttendanceNFT,
        _ctx: &mut TxContext
    ) {
        let AttendanceNFT { id, event_id: _, attendee: _, check_in_time: _, metadata: _, event_name: _ } = nft;
        object::delete(id);
    }

    // === Getter functions ===

    public fun get_event_id(nft: &AttendanceNFT): ID {
        nft.event_id
    }

    public fun get_attendee(nft: &AttendanceNFT): address {
        nft.attendee
    }

    public fun get_check_in_time(nft: &AttendanceNFT): u64 {
        nft.check_in_time
    }

    public fun get_metadata(nft: &AttendanceNFT): String {
        nft.metadata
    }
}
